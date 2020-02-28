console.log("Core Testing Program");
const fetch = require('node-fetch');

//to Log or not to log variable
var printLogs = true;

/*
var practice1 =  fetch('https://www.nascar.com/cacher/2019/1/4783/entryList.json');
practice1.then(data => data.json()).then(json => console.log(json)).catch(err=>console.log(err));
*/
var url = "https://www.nascar.com/cacher/2020/1/4873/entryList.json";
/*
var getData = async url => {
  try {
    var response = await fetch(url);
    var json = await response.json();
    logger("Starting JSON Code");
    logger(json);

    var json = json.reduce(function(pv, cv) {
       pv[cv.vehicle_number]={};
       pv[cv.vehicle_number].vehicle_number = cv.vehicle_number;
       pv[cv.vehicle_number].driver_name = cv.driver_name;
       return pv;
    }, {});
  logger("Ending JSON Code");
  logger(json);


  } catch (error) {
    console.log(error);
  }
};


//testing Data Map Function
var getData = async url => {
  try {
    var response = await fetch(url);
    var json = await response.json();
    //logger("Starting JSON Code");
    //logger(json);

    var subset = json.map(function(driver,info) {
     return {vehicle_number: +driver.vehicle_number,
             driver_name: driver.driver_name};
   });

  logger("Resulting JSON");
  logger(subset);
  logger("Resulting JSON Sorted");
  logger(subset.sort(function(a, b){
    return b.vehicle_number - a.vehicle_number;
  }))


  } catch (error) {
    console.log(error);
  }
};

getData(url);*/

//function to convert 999 and null fields to 0
function lpDataFix(num) {
  if (num==null) {
    return 0;
  }
  if (num == 999){
    return 0;
  }
  return num;
}

logger(lpDataFix(5));

//Simple function to output logs in testing
function logger(textToPrint) {
  if (printLogs) {
  console.log(textToPrint);
  }
}
