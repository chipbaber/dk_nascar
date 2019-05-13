'user strict';
const fetch = require('node-fetch');
var PracticeData = {};

PracticeData.getPracticeData = async function(raceId, result) {
  console.log("Race Id Is: "+raceId);
  var url = 'https://www.nascar.com/cacher/2019/1/'+raceId;

  // get the entry list
  try {
    //Get the Entry list
    var response = await fetch(url+'/entryList.json');
    var entryList = await response.json();
    entryList = entryList.reduce(function(pv, cv) {
       pv[cv.vehicle_number]={};
       //replace removes all non-numbers from string
       pv[cv.vehicle_number].vehicle_number = cv.vehicle_number.replace( /\D+/g, '');
       pv[cv.vehicle_number].driver_name = cv.driver_name;
       pv[cv.vehicle_number].practice1_rank = 0;
       pv[cv.vehicle_number].practice2_rank = 0;
       pv[cv.vehicle_number].practice3_rank = 0;
       return pv;
    }, {});

      //get Practice One Rankings
      try {
      console.log("Retrieving Practice 1 Data");
      response = await fetch(url+'/practice1.json');
      var p1 = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(p1);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            entryList[p1[keys[i]].car_number.replace( /\D+/g, '')].practice1_rank = p1[keys[i]].finishing_position;
      }
      //clear p1
      p1={};
      }
    catch (error) {
        console.log("Error retrieving practice 1 data  "+ error);
      }


    //get Practice 2 Rankings
    try {
      console.log("Retrieving Practice 2 Data");
      response = await fetch(url+'/practice2.json');
      var p2 = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(p2);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            entryList[p2[keys[i]].car_number.replace( /\D+/g, '')].practice2_rank = p2[keys[i]].finishing_position;
      }
    }
    catch (error) {
        console.log("Error retrieving practice 2 data  "+ error);
    }


    result(null, entryList);
  }
  catch (error) {
    console.log("error in PracticeData.getPracticeData  "+error);
  }

};


module.exports= PracticeData;
