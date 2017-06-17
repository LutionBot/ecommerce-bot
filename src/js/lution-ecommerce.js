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
      e = e || window.event;
      var target = e.target || e.srcElement;
      target.removeEventListener('click', lution.initBot, false);

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         var data = JSON.parse(this.responseText);
          document.getElementById('chat-input').onkeypress = function(e) {
            if (e.which == 13) {
              lution.chooseSearchType();
            }
          };

          lution.openChat();
          lution.companyData = data;
          lution.insertBotMessage(lution.companyData.greetingMsg);
        }
      };
      xhttp.open("GET", "https://www.lutionbot.com/api/company/tan%20intensa?startChat=true", true);
      xhttp.send();

    };

    lution.chooseSearchType = function() {
      var val = document.getElementsByClassName('chat-input')[0].value;
      lution.clearInput();
      var flow = lution.initSearchFlow(val);
      if  (flow.searchType == "query" || (flow.searchType != "query" && val.split(" ").length > 1)) {
        lution.search(flow.searchType, val);
      } else {
        lution.insertUserMessage(val);
        lution.insertBotMessage(flow.msg);
        document.getElementById("chat-input").onkeypress = function(e) {
          if (e.which == 13) {
            lution.search(flow.searchType);
          }
        };
      }
    };

    lution.search = function(searchType, searchTerm) {
      var val;
      if (searchTerm) {
        val = searchTerm;
        searchType = "fb";
      } else {
        val = document.getElementsByClassName('chat-input')[0].value;
      }

      if(val.split(" ").length == 1 && (val.toLowerCase().indexOf("categoria") != -1 || val.toLowerCase().indexOf("producto") != -1)) {
        lution.chooseSearchType();
      } else {
        lution.insertUserMessage(val);
        lution.clearInput();
        var xhttp = new XMLHttpRequest(),
          postData = JSON.stringify({
            company: lution.companyData.company,
            word: val.toLowerCase(),
            type: searchType
          });

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var map = {
              product: 'products',
              category: 'categories'
            };

            lution.insertBotMessage(lution.companyData.startConfig[map[searchType]].searchMsg + " ", lution.answerPrettifier(this.responseText));
            document.getElementById("chat-input").onkeypress = function(e) {
              if (e.which == 13) {
                lution.chooseSearchType();
              }
            };
          }
        };
        xhttp.open("POST", "https://www.lutionbot.com/api/text", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(postData);
      }
    };

    lution.answerPrettifier = function(data) {
      var obj = {
        a: {
          msg: '',
          href: ''
        }
      };

      try {
        data = JSON.parse(data);
        obj.a.msg = data[0].reference;
        obj.a.href = data[0].reference;
        return obj;
      } catch (e) {
        data = data;
        return data;
      }
    };

    lution.initSearchFlow = function(value) {
      if (value.toLowerCase().indexOf("producto") != -1) {
        lution.startConfig = lution.companyData.startConfig.products;
        lution.startConfig.type = "product";
      } else if (value.toLowerCase().indexOf("categoria") != -1) {
        lution.startConfig = lution.companyData.startConfig.categories;
        lution.startConfig.type = "category";
      } else {
        lution.startConfig = {
          msg: "Encontramos los siguientes resultados para lo que estas buscando: " + lution.companyData.searchUrl + value.toLowerCase().split(" ").join("+"),
          type: "query"
        }
      }

      return {
        msg: lution.startConfig.msg,
        searchType: lution.startConfig.type
      };
    };

    lution.clearInput = function() {
      document.getElementsByClassName('chat-input')[0].value = "";
    };

    lution.openChat = function(e) {
      document.getElementsByClassName('chat-window')[0].classList.remove('dont-show');
      e = e || window.event;
      var target = e.target || e.srcElement;
      target.removeEventListener('click', lution.openChat, false);
      document.getElementsByClassName('chat-title')[0].addEventListener("click", lution.closeChat, false);
      document.getElementsByClassName('chat-title')[0].innerHTML = "LutionBot";
    };

    lution.closeChat = function(e) {
      document.getElementsByClassName('chat-window')[0].classList.add('dont-show');
      e = e || window.event;
      var target = e.target || e.srcElement;
      target.removeEventListener('click', lution.closeChat, false);
      document.getElementsByClassName('chat-title')[0].addEventListener("click", lution.openChat, false);
    };


    lution.insertBotMessage = function(msg, elem) {
      var options = {className: "chat-line bot-line", span: {msg: msg}};
      if (elem) {
        for (var i = 0; i < Object.keys(elem).length; i++) {
          options[Object.keys(elem)[i]] = elem[Object.keys(elem)[i]]
        }
      }

      lution.createDiv(false, document.getElementsByClassName('chat-box')[0], options);
      document.getElementsByClassName('chat-box')[0].scrollTop = document.getElementsByClassName('chat-box')[0].scrollHeight;

    };

    lution.insertUserMessage = function(msg) {
      lution.createDiv(false, document.getElementsByClassName('chat-box')[0], {className: "chat-line user-line", span: {msg: msg}});
      document.getElementsByClassName('chat-box')[0].scrollTop = document.getElementsByClassName('chat-box')[0].scrollHeight;
    };

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

      if (options.span && options.span.msg) {
        var spanContainer = document.createElement("span"),
          spanNode = document.createTextNode(options.span.msg);

        spanContainer.appendChild(spanNode);
        container.appendChild(spanContainer);
      }

      if (options.a && options.a.msg && options.a.href) {
        var createA = document.createElement("a");
        var createAText = document.createTextNode(options.a.msg);
        createA.setAttribute('href', options.a.href);
        createA.appendChild(createAText);
        container.appendChild(createA);
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
