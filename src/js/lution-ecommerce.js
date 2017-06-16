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
          console.log(data);
          document.getElementById('chat-input').onkeypress = function(e) {
            if (e.which == 13) {

            }
          };
          document.getElementsByClassName('chat-window')[0].classList.remove('dont-show');
          document.getElementsByClassName('chat-title')[0].addEventListener("click", lution.closeChat, false);
          document.getElementsByClassName('chat-title')[0].innerHTML = "LutionBot";

          // $(".chat-title").attr("onclick","closeChat()");
        }
      };
      xhttp.open("GET", "https://www.lutionbot.com/api/company/tan%20intensa?startChat=true", true);
      xhttp.send();


      //     $("#chat-input").keypress(function(e) {
      //       if(e.which == 13) {
      //         chooseSearchType();
      //       }
      //     });
      //     initCompany(data);
      //     openChat();
      //     $(".chat-title").text("LutionBot");
      //     insertBotMessage(companyFirstGreeting());

    };

    lution.closeChat = function() {

    }


    lution.createDiv = function(innerText, parent, options) {
      var container = document.createElement("div");

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

      if (innerText != false) {
        var node = document.createTextNode(innerText);
        container.appendChild(node);
      }

      parent.appendChild(container);
    };

    lution.createInput = function(type, parent, options) {
      var container = document.createElement("INPUT");
      container.setAttribute("type", type);

      if (options.className) {
        container.setAttribute("class", options.className);
      }

      if (options.id) {
        container.setAttribute("id", options.id);
      }

      parent.appendChild(container);
    };

    lution.createDiv('Hola amigos', lution.container, {className: 'chat-title', clickFunction: lution.initBot});
    lution.createDiv(false, lution.container, {className: 'chat-window dont-show'});
    lution.createDiv(false, document.getElementsByClassName('chat-window')[0], {className: 'chat-box'});
    lution.createDiv(false, document.getElementsByClassName('chat-window')[0], {className: 'chat-clearBoth'});
    lution.createDiv(false, document.getElementsByClassName('chat-window')[0], {className: 'chat-input-box'});
    lution.createInput('text', document.getElementsByClassName('chat-input-box')[0], {className: 'chat-input', id: 'chat-input'});

    // lution.container = lution.addClass(lution.container, 'prueba');

  };

  window.Lution = Lution;
})();

var lution = new Lution('.chat-container');
