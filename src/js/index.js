// 'use strict';
//
// function initBot() {
//   $(".chat-title").removeAttr("onclick");
//
//   $.ajax({
//     type: "GET",
//     url: 'https://www.lutionbot.com/api/company/tan%20intensa?startChat=true',
//     success: function(data) {
//       $("#chat-input").keypress(function(e) {
//           if(e.which == 13) {
//             chooseSearchType();
//           }
//       });
//       initCompany(data);
//       openChat();
//       $(".chat-title").text("LutionBot");
//       $(".chat-title").attr("onclick","closeChat()");
//       insertBotMessage(companyFirstGreeting());
//     },
//     error: function(err) {
//       insertBotMessage("Disculpe, estamos sufriendo algunas dificultades técnicas. Intente realizar su consulta más tarde.");
//     }
//   });
// }
//
// function closeChat() {
//   $(".chat-window").addClass("dont-show");
//   $(".chat-title").attr("onclick","openChat()");
// }
//
// function openChat() {
//   $(".chat-window").removeClass("dont-show");
//   $(".chat-title").attr("onclick","closeChat()");
// }
//
// function chooseSearchType() {
//   var val = $(".chat-input").val();
//   clearInput();
//   var flow = initSearchFlow(val);
//   if  (flow.searchType == "query" || (flow.searchType != "query" && val.split(" ").length > 1)) {
//     console.log("1 - Voy directo a Search")
//     search(flow.searchType, val);
//   } else {
//     insertUserMessage(val);
//     console.log("1 - Voy directo a hacer bind y preguntar")
//     insertBotMessage(flow.msg);
//     $("#chat-input").unbind("keypress");
//     $("#chat-input").keypress(function(e) {
//       if(e.which == 13) {
//         search(flow.searchType);
//       }
//     });
//   }
// }
//
// function search(searchType, searchTerm) {
//   console.log("2 - En los params hay:", searchType, searchTerm)
//   var val;
//   if (searchTerm) {
//     val = searchTerm;
//     searchType = "fb";
//   } else {
//     val = $(".chat-input").val();
//   }
//
//   if(val.split(" ").length == 1 && (val.toLowerCase().indexOf("categoria") != -1 || val.toLowerCase().indexOf("producto") != -1)) {
//     console.log("3 - Vuelvo a inicio de flujo chooseSearchType")
//     chooseSearchType();
//   } else {
//     console.log("3 - AJAX a api/text")
//     insertUserMessage(val);
//     clearInput();
//     $.ajax({
//       type: "POST",
//       url: 'https://www.lutionbot.com/api/text',
//       data: {
//         company: companyName(),
//         word: val.toLowerCase(),
//         type: searchType
//       },
//       success: function(data) {
//         console.log("4 - Resultado ajax: ", data, searchType)
//         insertBotMessage(prettyAnswer(data, searchType));
//         $("#chat-input").unbind("keypress");
//         $("#chat-input").keypress(function(e) {
//           if(e.which == 13) {
//             chooseSearchType();
//           }
//         });
//       },
//       error: function(err) {
//         insertBotMessage("Disculpe, estamos sufriendo algunas dificultades técnicas. Intente realizar su consulta más tarde.");
//       }
//     });
//   }
// }
//
// function clearInput() {
//   $(".chat-input").val("");
// }
//
// function insertBotMessage(msg) {
//   $(".chat-box").append('<div class="chat-line bot-line"><span>'+msg+'</span></div>');
//   $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
// }
//
// function insertUserMessage(msg) {
//   $(".chat-box").append('<div class="chat-line user-line"><span>'+msg+'</span></div>');
//   $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
// }
//
// function changeSendButtonFlow(func) {
//   $(".chat-send-button").attr("onclick",func);
// }

