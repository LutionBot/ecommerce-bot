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
    // lution.hasJquery = typeof window.jQuery != 'undefined';
    lution.hasJquery = false;

    if (container.slice(0, 1) == '#') {
      lution.containerType = 'id';
    } else if (container.slice(0, 1) == '.') {
      lution.containerType = 'class';
    } else {
      console.log('Container is invalid');
      return;
    }

    if (lution.hasJquery == false) {
      container = container.slice(1, container.length);
    }

    if (lution.hasJquery) {
      lution.container = $(container);
    } else {
      if (lution.containerType == 'class') {
        lution.container = document.getElementsByClassName(container)[0];
      } else {
        lution.container = document.getElementById(container);
      }
    }

    lution.addClass = function(element, className) {
      if (lution.hasJquery) {
        element.addClass(className);
      } else {
        if (lution.containerType == 'class') {
          element.className += " " + className;
        } else {
          element.className += " " + className;
        }
      }

      return container;
    };

    lution.initBot = function(e) {
      console.log(1234);
      e = e || window.event;
      var target = e.target || e.srcElement;
      target.removeEventListener('click', lution.initBot, false);

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         var data = JSON.parse(this.responseText);
        } else {
          console.log('AJAX error');
        }
      };
      xhttp.open("GET", "https://www.lutionbot.com/api/company/tan%20intensa?startChat=true", true);
      xhttp.send();
      // $.ajax({
      //   type: "GET",
      //   url: 'https://www.lutionbot.com/api/company/tan%20intensa?startChat=true',
      //   success: function(data) {
      //     $("#chat-input").keypress(function(e) {
      //       if(e.which == 13) {
      //         chooseSearchType();
      //       }
      //     });
      //     initCompany(data);
      //     openChat();
      //     $(".chat-title").text("LutionBot");
      //     $(".chat-title").attr("onclick","closeChat()");
      //     insertBotMessage(companyFirstGreeting());
      //   },
      //   error: function(err) {
      //     insertBotMessage("Disculpe, estamos sufriendo algunas dificultades técnicas. Intente realizar su consulta más tarde.");
      //   }
      // });
    };




    lution.createDiv = function(innerText, parent, options) {
      var container = document.createElement("div"),
        node = document.createTextNode(innerText);

      if (options.className) {
        container.className = options.className;
      }

      if (options.clickFunction) {
        if (container.addEventListener) {
          container.addEventListener("click", options.clickFunction, false);
        } else {
          if (container.attachEvent) {
            container.attachEvent("click", options.clickFunction);
          }
        }
      }

      container.appendChild(node);
      parent.appendChild(container);
    };

    lution.createDiv('Hola amigos', lution.container, {className: 'chat-title', clickFunction: lution.initBot});

    lution.container = lution.addClass(lution.container, 'prueba');

  };

  window.Lution = Lution;
})();

var lution = new Lution('.test-container');
