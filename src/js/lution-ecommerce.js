(function () {
  'use strict';

  var Lution = function (container, params) {
    if (!(this instanceof Lution)) return new Lution(container, params);

    var defaultParams = {
      theme: 'light'
    };

    var lution = this;
    params = params || {};
    container = container || "";

    for (var def in defaultParams) {
      if (typeof params[def] === 'undefined') {
        params[def] = defaultParams[def];
      }
    }

    lution.container = container;

    lution.params = params;
    lution.hasJquery = typeof window.jQuery != 'undefined';

    if (container.slice(0, 1) == '#') {
      lution.containerType = 'id';
    } else if (container.slice(0, 1) == '.') {
      lution.containerType = 'class';
    } else {
      console.log('Container is invalid');
      return;
    }

    if (!lution.hasJquery) {
      lution.container = lution.container.slice(1, lution.container.length);
    }

    lution.addClass = function(container, className) {
      if (lution.hasJquery) {
        $(container).addClass(className);
      } else {
        if (lution.containerType == 'class') {
          document.getElementsByClassName(container)[0].className += " " + className;
        } else {
          document.getElementById(container).className += " " + className;
        }
      }

      return container;
    };


    console.log(123);
    lution.container = lution.addClass(lution.container, 'prueba');

  };

  window.Lution = Lution;
})();

var lution = new Lution('.test-container');
