console.log("Testing fetch/reduce");
const fetch = require('node-fetch');

//var practice1 =  fetch('https://www.nascar.com/cacher/2019/1/4783/entryList.json');
//practice1.then(data => data.json()).then(json => console.log(json)).catch(err=>console.log(err));

//or
var url = "https://www.nascar.com/cacher/2019/1/4783/entryList.json";
var getData = async url => {
  try {
    var response = await fetch(url);
    var json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

getData(url);
