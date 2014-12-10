/* jshint strict:false */

(function () {
  Polymer({
    pressed: {value: false, reflect: true},
    downAction: function (e) {
      this.super();
      var value = this.pressed.value;
      this.pressed.value = !value;
      console.log(1);
    }
  });

})();


