'use strict';

(function () {
  var authData = {};
  var authElements = [];
  var modalDisplayed = false;

  Polymer({
    publish: {
      loginRequired: true
    },
    get loggedIn() {
      return authData.login !== undefined;
    },
    get login() {
      return authData.login;
    },
    get space() {
      return authData.space;
    },
    get language() {
      return authData.language;
    },
    get email() {
      return authData.email;
    },
    ready: function () {
      authElements.push(this);

      if (!authData.login && !modalDisplayed) {
        var cookieValue = this.$.cookie.value;

        if (cookieValue) {
          this.saveAuthData(JSON.parse(cookieValue));
        } else {
          this.toggleLoginModal(true);
        }
      }
    },
    submit: function () {
      this.$.loginForm.submit();
    },
    handleResponse: function (e, xhr) {
      var parsedResponse = JSON.parse(xhr.response);

      switch (xhr.status) {
        case 201:
          this.$.cookie.value = xhr.response;
          this.$.cookie.save();
          this.saveAuthData(parsedResponse);
          this.toggleLoginModal(false);
          this.fireToAllElements('logged-in');
          break;
        case 400:
          this.errorText = parsedResponse.error;
          break;
        default:
          this.errorText = "Unknown error";
      }
    },
    saveAuthData: function (data) {
      if (data !== undefined) {
        authData = data;
      }

      // Forcing properties update
      this.dummy = true;
    },
    logout: function () {
      this.saveAuthData({});
      this.$.cookie.deleteCookie();
      this.toggleLoginModal(true);
      this.fireToAllElements('logged-out');
    },
    toggleLoginModal: function (show) {
      if (this.loginRequired) {
        this.$.loginModal.toggle();
        modalDisplayed = show;
      }
    },
    fireToAllElements: function(eventName) {
      authElements.forEach(function (authElement) {
        authElement.fire(eventName, {});
      });
    },
    onLoggedIn: function () {
      this.saveAuthData();
    }
  });
})();
