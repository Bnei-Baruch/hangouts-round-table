'use strict';

(function () {
  var loggedIn = false;

  Polymer({
    get loggedIn() {
      return loggedIn;
    },
    ready: function () {
      var cookieValue = this.$.cookie.value;

      if (cookieValue) {
        this.saveAuthData(JSON.parse(cookieValue));
      } else {
        this.$.loginModal.toggle();
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
          this.$.loginModal.toggle();
          break;
        case 400:
          this.errorText = parsedResponse.error;
          break;
        default:
          this.errorText = "Unknown error";
      }
    },
    saveAuthData: function (authData) {
      for (var key in authData) {
        this[key] = authData[key];
      }
      loggedIn = true;
    },
    logout: function () {
      this.$.cookie.deleteCookie();
      loggedIn = false;
      this.$.loginModal.toggle();
    }
  });
})();
