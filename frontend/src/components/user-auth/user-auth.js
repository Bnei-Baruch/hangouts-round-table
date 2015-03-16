'use strict';

(function () {
  var authData = {};
  var modalDisplayed = false;

  Polymer({
    get loggedIn() {
      return authData.space !== undefined;
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
      if (!authData.space && !modalDisplayed) {
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
          break;
        case 400:
          this.errorText = parsedResponse.error;
          break;
        default:
          this.errorText = "Unknown error";
      }
    },
    saveAuthData: function (data) {
      authData = data;

      // Forcing binding mechanism to update DOM with global auth data
      this.dummy = true;
    },
    logout: function () {
      this.$.cookie.deleteCookie();
      this.toggleLoginModal(true);
      authData = null;
    },
    toggleLoginModal: function (show) {
      this.$.loginModal.toggle();
      modalDisplayed = show;
    }
  });
})();
