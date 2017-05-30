'use strict';

var self = {};

self.company = {};

function initCompany(data) {
  self.company = data;
}

function companyFirstGreeting() {
  return self.company.greetingMsg;
}

function companyName() {
  return self.company.company;
}

function prettyAnswer(data) {
  console.log("type", typeof data)
  if (typeof data == "string") {
    return data;
  } else if (Object.prototype.toString.call( data ) === '[object Array]' ) {
    return data[0].reference;
  } else {
    return data.reference;
  }
}

function initSearchFlow(value) {
  var startConfig;
  if (value.toLowerCase().indexOf("producto") != -1) {
    startConfig = self.company.startConfig.products;
    startConfig.type = "product";
  } else if(value.toLowerCase().indexOf("categoria") != -1){
    startConfig = self.company.startConfig.categories;
    startConfig.type = "category";
  } else {
    startConfig = {
      msg: "Encontramos los siguientes resultados para lo que estas buscando: "+self.company.searchUrl+value.toLowerCase().split(" ").join("+"),
      type: "query"
    }
  }

  return {msg: startConfig.msg, searchType: startConfig.type};
}
