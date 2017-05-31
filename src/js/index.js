'use strict';

function initBot() {
  console.log("First ajax!")
  $.ajax({
    type: "GET",
    url: 'https://www.lutionbot.com/api/company/tan%20intensa',
    success: function(data) {
      console.log('Respuesta: ', data);
      initCompany(data);
      $(".chat-window").removeClass("dont-show");
      insertBotMessage(companyFirstGreeting());
    },
    error: function(err) {

      console.log('ERROR EN FIRST AJAX 1234', err);

    }
  });
}

function chooseSearchType() {
  var val = $(".chat-input").val();
  insertUserMessage(val);
  clearInput();
  var flow = initSearchFlow(val);
  insertBotMessage(flow.msg);
  if (flow.searchType != "query") {
    changeSendButtonFlow("search('"+flow.searchType+"')");
  }
}

function search(searchType) {
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
        insertBotMessage(prettyAnswer(data));
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
}

function insertUserMessage(msg) {
  $(".chat-box").append('<div class="chat-line user-line"><span>'+msg+'</span></div>');
}

function changeSendButtonFlow(func) {
  $(".chat-send-button").attr("onclick",func);
}
