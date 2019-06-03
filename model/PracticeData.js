'user strict';
const fetch = require('node-fetch');
var PracticeData = {};

PracticeData.getPracticeData = async function(raceId, result) {
  var startTime = (new Date()).getTime();
  var loadtime = 0;
  console.log("Race Id Is: "+raceId);
  var url = 'https://www.nascar.com/cacher/2019/1/'+raceId;
  var hasP1, hasP2, hasP3, hasQ = false;

  // get the entry list
  try {
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
         pv[cv.vehicle_number].qualified = 0;
         return pv;
      }, {});
      console.log("Entry List Received for race id: "+raceId);
    }
    catch (error) {
      if (error.toString().substring(0,10) == 'FetchError') {
          console.log("FetchError");
      }
      else {
        console.log("Error retrieving entry List  "+ error);
      }
      }

      //get Practice One Rankings
      try {
      console.log("Retrieving Practice 1 Data");
      response = await fetch(url+'/practice1.json');
      var p1 = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(p1);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            try {
            entryList[p1[keys[i]].car_number.replace( /\D+/g, '')].practice1_rank = p1[keys[i]].finishing_position;
            }
            catch (error) {
              console.log("Unable to process driver information for car : " + p1[keys[i]].car_number);
              console.log("Error is: "+error);
            }
      }
      //clear p1
      p1={};
      hasP1=true;
      console.log("Practice 1 List Received for race id: "+raceId);
      }
    catch (error) {
      if (error.toString().substring(0,10) == 'FetchError') {
          console.log("FetchError");
      }
      else {
        console.log("Error retrieving practice 1 data  "+ error);
      }
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
      p2={};
      hasP2=true;
      console.log("Practice 2 List Received for race id: "+raceId);
    }
    catch (error) {
      if (error.toString().substring(0,10) == 'FetchError') {
          console.log("FetchError");
      }
      else {
        console.log("Error retrieving practice 2 data  "+ error);
      }
    }
    //get Practice 3 Rankings
    try {
      console.log("Retrieving Practice 3 Data");
      response = await fetch(url+'/practice3.json');
      var p3 = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(p3);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            entryList[p3[keys[i]].car_number.replace( /\D+/g, '')].practice2_rank = p3[keys[i]].finishing_position;
      }
      p3={};
      hasP3=true;
      console.log("Practice 3 List Received for race id: "+raceId);
    }
    catch (error) {
        if (error.toString().substring(0,10) == 'FetchError') {
            console.log("FetchError");
        }
        else {
        console.log("Error retrieving practice 3 data  "+ error);
      }
    }

    //Qualifiing Rest Data Call
    try {
      console.log("Retrieving Qualifiing Data");
      response = await fetch(url+'/qualification.json');
      var q = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(q);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            entryList[q[keys[i]].car_number.replace( /\D+/g, '')].qualified = q[keys[i]].finishing_position;
      }
      q={};
      hasQ=true;
      console.log("Qualifing List Received for race id: "+raceId);
    }
    catch (error) {
      if (error.toString().substring(0,10) == 'FetchError') {
          console.log("FetchError");
      }
      else {
        console.log("Error retrieving qualifiy results  "+ error);
      }

    }

    //Computations on qualifing Data
    /*researched other Race API's here are notes to add in
    raceResults.json
lapAvg_mencs_final_practice.json
lapAvg_mencs_practice_1.json
lapAvg_mencs_practice_2.json
https://www.nascar.com/json/drivers/
    */
    try {
      for (var car in entryList) {
          entryList[car].consistency = entryList[car].practice1_rank + entryList[car].practice2_rank + entryList[car].practice3_rank + entryList[car].qualified;
      }
    }
    catch (error) {
      console.log("Error massaging computations." +error);

    }



    var endTime = (new Date()).getTime();
    loadtime =endTime - startTime;
    console.log("Rest Service Load Time: "+ loadtime);
    result(null, entryList);
  }
  catch (error) {
    console.log("error in PracticeData.getPracticeData  "+error);
  }

};


module.exports= PracticeData;
