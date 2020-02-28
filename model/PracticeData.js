'user strict';
const fetch = require('node-fetch');
var PracticeData = {};
//to Log or not to log variable
var printLogs = true;

/*getPracticeData
To build the composite application we need to access several REST API sources.
The core REST API path is:
https://www.nascar.com/cacher/<add year>/1/<add race id>/<json name>
Example:
https://www.nascar.com/cacher/2020/1/4873/raceResults.json
Other key json names are:
entryList.json
practice1.json
practice2.json
practice3.json
lapAvg_old_practice_1.json
lapAvg_old_final_practice.json
raceResults.json
https://www.nascar.com/json/drivers/
*/
PracticeData.getPracticeData = async function(raceId, raceYear, result) {
  var startTime = (new Date()).getTime();
  var loadtime = 0;
  logger("Race Id Is: "+raceId);
  var url = 'https://www.nascar.com/cacher/'+raceYear+'/1/'+raceId;
  var hasP1, hasP2, hasP3, hasQ = false;

  // get the entry list
  try {
      try {
      //Get the Entry list
      logger("Gathering EntryList: ");
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
         pv[cv.vehicle_number].fiveLap = 0;
         pv[cv.vehicle_number].tenLap = 0;
         pv[cv.vehicle_number].fifteenLap = 0;
         pv[cv.vehicle_number].twentyLap = 0;
         pv[cv.vehicle_number].twentyfiveLap = 0;
         pv[cv.vehicle_number].thirtyLap = 0;
         pv[cv.vehicle_number].speedRank = 0;
         pv[cv.vehicle_number].tenLapRank = 0;
         pv[cv.vehicle_number].powerRank = 0;
         return pv;
      }, {});
      logger("Entry List Received for race id: "+raceId);
    }
    catch (error) {
      if (error.toString().substring(0,10) == 'FetchError') {
          logger("FetchError");
      }
      else {
        logger("Error retrieving entry List  "+ error);
      }
      }

      //get Practice One Rankings
      try {
      logger("Retrieving Practice 1 Data");
      response = await fetch(url+'/practice1.json');
      var p1 = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(p1);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            try {
            entryList[p1[keys[i]].car_number.replace( /\D+/g, '')].practice1_rank = p1[keys[i]].finishing_position;
            }
            catch (error) {
              logger("Unable to process driver information for car : " + p1[keys[i]].car_number);
              logger("Error is: "+error);
            }
      }
      //clear p1
      p1={};
      hasP1=true;
      logger("Practice 1 List Received for race id: "+raceId);
      }
    catch (error) {
      if (error.toString().substring(0,10) == 'FetchError') {
          logger("FetchError No Data exists for Practice 1");
      }
      else {
        logger("Error retrieving practice 1 data  "+ error);
      }
      }


    //get Practice 2 Rankings
    try {
      logger("Retrieving Practice 2 Data");
      response = await fetch(url+'/practice2.json');
      var p2 = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(p2);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            entryList[p2[keys[i]].car_number.replace( /\D+/g, '')].practice2_rank = p2[keys[i]].finishing_position;
      }
      p2={};
      hasP2=true;
      logger("Practice 2 List Received for race id: "+raceId);
    }
    catch (error) {
      if (error.toString().substring(0,10) == 'FetchError') {
          logger("No Data exists for Practice 2");
      }
      else {
        logger("Error retrieving practice 2 data  "+ error);
      }
    }
    //get Practice 3 Rankings
    try {
      logger("Retrieving Practice 3 Data");
      response = await fetch(url+'/practice3.json');
      var p3 = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(p3);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            entryList[p3[keys[i]].car_number.replace( /\D+/g, '')].practice2_rank = p3[keys[i]].finishing_position;
      }
      p3={};
      hasP3=true;
      logger("Practice 3 List Received for race id: "+raceId);
    }
    catch (error) {
        if (error.toString().substring(0,10) == 'FetchError') {
            logger("FetchError No Data exists for Practice 3");
        }
        else {
        logger("Error retrieving practice 3 data  "+ error);
      }
    }

    //Qualifiing Rest Data Call
    try {
      logger("Retrieving Qualifiing Data");
      response = await fetch(url+'/qualification.json');
      var q = await response.json();
      //loop through result and add in practice 1 rank
      var keys = Object.keys(q);
      for( var i = 0,length = keys.length; i < length; i++ ) {
            entryList[q[keys[i]].car_number.replace( /\D+/g, '')].qualified = q[keys[i]].finishing_position;
      }
      q={};
      hasQ=true;
      logger("Qualifing List Received for race id: "+raceId);
    }
    catch (error) {
      if (error.toString().substring(0,10) == 'FetchError') {
          logger("FetchError No Data exists for Qualifing");
      }
      else {
        logger("Error retrieving qualifiy results  "+ error);
      }
    }

    //SetLap Averages if exists
    try {
      response = await fetch(url+'/lapAvg_old_final_practice.json');
      var lapAvg = await response.json();
      var keys = Object.keys(lapAvg);
      for( var i = 0,length = keys.length; i < length; i++ ) {
           //Update 5 Lap Avg Rank
          // logger("five Lap for "+ lapAvg[keys[i]].FullName+" is "+ lpDataFix(lapAvg[keys[i]].Con5LapRank));

           entryList[lapAvg[keys[i]].Number.replace( /\D+/g, '')].fiveLap = lpDataFix(lapAvg[keys[i]].Con5LapRank);
            //Update 10 Lap Avg Rank
           entryList[lapAvg[keys[i]].Number.replace( /\D+/g, '')].tenLap = lpDataFix(lapAvg[keys[i]].Con10LapRank);
            //Update 15 Lap Avg Rank
           entryList[lapAvg[keys[i]].Number.replace( /\D+/g, '')].fifteenLap = lpDataFix(lapAvg[keys[i]].Con15LapRank);
            //Update 20 Lap Avg Rank
           entryList[lapAvg[keys[i]].Number.replace( /\D+/g, '')].twentyLap = lpDataFix(lapAvg[keys[i]].Con20LapRank);
            //Update 25 Lap Avg Rank
           entryList[lapAvg[keys[i]].Number.replace( /\D+/g, '')].twentyfiveLap = lpDataFix(lapAvg[keys[i]].Con25LapRank);
            //Update 30 Lap Avg Rank
          entryList[lapAvg[keys[i]].Number.replace( /\D+/g, '')].thirtyLap = lpDataFix(lapAvg[keys[i]].Con30LapRank);
      }
    }
    catch (error) {
      logger("Error adding Lap Averages. " +error);
    }

    //Computations on qualifing Data
    try {
      for (var car in entryList) {
          //set consistency ranking
          entryList[car].consistency = entryList[car].practice1_rank + entryList[car].practice2_rank + entryList[car].practice3_rank + entryList[car].qualified;

          //if practice 3 exists then it is final practice, else leverage practice 2, if no practice 2 use practice 1
          if (hasP3) {
            //set speed Ranking Qualifing - finalpractice speed
            entryList[car].speedRank = entryList[car].qualified - entryList[car].practice3_rank;

            //set ten lap Ranking if ten lap avg was driven in practice, else leave zero
            if (entryList[car].tenLap>0) {
               entryList[car].tenLapRank = entryList[car].qualified - entryList[car].tenLap;
               //set powerRank if 10 lap driven, else leave 0
               entryList[car].powerRank = entryList[car].tenLapRank +entryList[car].speedRank;
            }


          }
          else if (hasP2) {
            entryList[car].speedRank = entryList[car].qualified - entryList[car].practice2_rank;
            //set ten lap Ranking
            if (entryList[car].tenLap>0) {
               entryList[car].tenLapRank = entryList[car].qualified - entryList[car].tenLap;
               entryList[car].powerRank = entryList[car].tenLapRank +entryList[car].speedRank;
            }

          }
          else {
            //use practice 1
            entryList[car].speedRank = entryList[car].qualified - entryList[car].practice1_rank;
            //set ten lap Ranking
            if (entryList[car].tenLap>0) {
               entryList[car].tenLapRank = entryList[car].qualified - entryList[car].tenLap;
               entryList[car].powerRank = entryList[car].tenLapRank +entryList[car].speedRank;
            }
          }
          //set ten lap Ranking

          //set powerRank

      }
    }
    catch (error) {
      logger("Error massaging computations." +error);
    }


    var endTime = (new Date()).getTime();
    loadtime =endTime - startTime;
    logger("Rest Service Load Time: "+ loadtime);
    result(null, entryList);
  }
  catch (error) {
    logger("error in PracticeData.getPracticeData  "+error);
  }

};

//Simple function to output logs in testing
function logger(textToPrint) {
  if (printLogs) {
  console.log(textToPrint);
  }
}

//function to convert 999 and null fields to 0 from lapAvg REST data when the values are not run in practice.
function lpDataFix(num) {
  if (isNaN(num)){
    return 0;
  }
  else if (num==999) {
    return 0;
  }
  else if (num==null) {
    return 0;
  }
  else {
    return num;
  }
}

module.exports= PracticeData;
