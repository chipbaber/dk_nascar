'user strict';
const fetch = require('node-fetch');
var PracticeData = {};

PracticeData.getPracticeData = async function(raceId, result) {
  console.log("Race Id Is: "+raceId);
  var url = 'https://www.nascar.com/cacher/2019/1/'+raceId+'/entryList.json';
  console.log("URL Is: "+url);
  // get the entry list
  try {
    var response = await fetch(url);
    var entryList = await response.json();
    entryList = entryList.reduce(function(pv, cv) {
       pv[cv.vehicle_number]={};
       pv[cv.vehicle_number].vehicle_number = cv.vehicle_number;
       pv[cv.vehicle_number].driver_name = cv.driver_name;
       return pv;
    }, {});
    console.log("Data Returned is: "+entryList);
    result(null, entryList);
  }
  catch (error) {
    console.log(error);
  }

};

//retrieve the entry list for the event.
var getData = async url => {
  try {
    var response = await fetch(url);
    var json = await response.json();
    //console.log(json);
    /*reducing*/
    json = json.reduce(function(pv, cv) {
       pv[cv.vehicle_number]={};
       pv[cv.vehicle_number].vehicle_number = cv.vehicle_number;
       pv[cv.vehicle_number].driver_name = cv.driver_name;
       return pv;
    }, {});
 //console.log(json);
  } catch (error) {
    console.log(error);
  }
};

module.exports= PracticeData;
