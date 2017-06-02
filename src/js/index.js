'use strict';

function initBot() {
  $(".chat-title").removeAttr("onclick");
  console.log("First ajax!")

  $.ajax({
    type: "GET",
    url: 'https://www.lutionbot.com/api/company/tan%20intensa',
    success: function(data) {
      console.log('Respuesta: ', data);
      $("#chat-input").keypress(function(e) {
          if(e.which == 13) {
            chooseSearchType();
          }
      });
      initCompany(data);
      openChat();
      $(".chat-title").text("LutionBot");
      $(".chat-title").attr("onclick","closeChat()");
      insertBotMessage(companyFirstGreeting());
    },
    error: function(err) {

      console.log('ERROR EN FIRST AJAX 1234', err);

    }
  });
}

function closeChat() {
  $(".chat-window").addClass("dont-show");
  $(".chat-title").attr("onclick","openChat()");
}

function openChat() {
  $(".chat-window").removeClass("dont-show");
  $(".chat-title").attr("onclick","closeChat()");
}

function chooseSearchType() {
  console.log("chooseSearchType started")
  var val = $(".chat-input").val();
  insertUserMessage(val);
  clearInput();
  var flow = initSearchFlow(val);
  insertBotMessage(flow.msg);
  if (flow.searchType != "query") {
    $("#chat-input").unbind("keypress");
    $("#chat-input").keypress(function(e) {
        if(e.which == 13) {
          search(flow.searchType);
        }
    });
    // changeSendButtonFlow("search('"+flow.searchType+"')");
  }
}

function search(searchType) {
  console.log("search started")
  var val = $(".chat-input").val();
  if(val.split(" ").length == 1 && (val.toLowerCase().indexOf("categoria") != -1 || val.toLowerCase().indexOf("producto") != -1)) {
    chooseSearchType();
  } else {
    insertUserMessage(val);
    clearInput();
    $.ajax({
      type: "POST",
      url: 'https://www.lutionbot.com/api/text',
      data: {
        company: companyName(),
        word: val.toLowerCase(),
        type: searchType
      },
      success: function(data) {
        console.log('Respuesta search category: ', data);
        insertBotMessage(prettyAnswer(data, searchType));
      },
      error: function(err) {

        console.log('ERROR EN SEARCH CATEGORY AJAX 1234', err);

      }
    });
  }
}

function clearInput() {
  $(".chat-input").val("");
}

function insertBotMessage(msg) {
  $(".chat-box").append('<div class="chat-line bot-line"><span>'+msg+'</span></div>');
  $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
}

function insertUserMessage(msg) {
  $(".chat-box").append('<div class="chat-line user-line"><span>'+msg+'</span></div>');
  $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
}

function changeSendButtonFlow(func) {
  $(".chat-send-button").attr("onclick",func);
}
