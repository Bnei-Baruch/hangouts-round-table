'use strict';

(function () {
  Polymer({
    ready: function () {
      this.$.loginModal.toggle();
    },
    submit: function () {
      this.$.loginForm.submit();
    },
    handleResponse: function (e, xhr) {
      var response = JSON.parse(xhr.response);

      switch (xhr.status) {
        case 201:
          this.$.cookie.value = xhr.response;
          this.$.cookie.save();
          this.$.loginModal.toggle();
          break;
        case 400:
          this.errorText = response.error;
          break;
        default:
          this.errorText = "Unknown error";
      }
    },
    saveAuthData: function (data) {
      for (var key in values) {
        this[key] = values[key];
      }
    }
  });
})();
