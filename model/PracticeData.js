'user strict';

var PracticeData = {};

PracticeData.getPracticeData = function(raceId, result) {

  console.log("Race Id Is: "+raceId);
  var practiceData ={};

  var number = 26;
  //add element
  practiceData[number] = {};
  practiceData[number].name = "Chip";
  practiceData[number].firstPracticeRank = 1;
  //add element
  number = 17;
  practiceData[number] = {};
  practiceData[number].name = "Ricky";
  practiceData[number].firstPracticeRank = 2;

  result(null, practiceData);
/*
  //Get Race entry list
  Https.get('https://www.nascar.com/cacher/2019/1/'+raceId+'/entryList.json', (resp) => {
  let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log("Practice entry data received.");
    holder=JSON.parse(data);
  });
}).on("error", (err) => {
  console.log("No entry data from nascar.com: " + err.message);
});

  //Get and parse practice 1 data
  Https.get('https://www.nascar.com/cacher/2019/1/'+raceId+'/practice1.json', (resp) => {
  let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log("Practice 1 data received.");
    practice_data=JSON.parse(data);
    //send to function to insert data

  });
}).on("error", (err) => {
  console.log("No Practice 1 data from nascar.com: " + err.message);
});
*/

};


module.exports= PracticeData;
