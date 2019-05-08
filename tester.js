console.log("Testing fetch/reduce");
const fetch = require('node-fetch');
/*
var practice1 =  fetch('https://www.nascar.com/cacher/2019/1/4783/entryList.json');
practice1.then(data => data.json()).then(json => console.log(json)).catch(err=>console.log(err));
*/
//or async

var url = "https://www.nascar.com/cacher/2019/1/4783/entryList.json";
var getData = async url => {
  try {
    var response = await fetch(url);
    var json = await response.json();
    var temp ={};
    console.log(json);
    /*reducing*/
    var json = json.reduce(function(pv, cv) {
       pv[cv.vehicle_number]={};
       pv[cv.vehicle_number].driver_name = cv.driver_name;
       
        return pv;
    }, {});

 console.log(json);


  } catch (error) {
    console.log(error);
  }
};

getData(url);
