//simple scratchpad to play with formatting of json object formation 
console.log("Testing JSON Object Creation");
var practiceData ={};

var number = "26";
//add element
practiceData[number] = {};
practiceData[number].name = "Chip";
practiceData[number].firstPracticeRank = 1;
//add element
number = 17;
practiceData[number] = {};
practiceData[number].name = "Ricky";
practiceData[number].firstPracticeRank = 2;

console.log(practiceData);

console.log("Update Name Element");
practiceData[26].name = "Chip Baber";

console.log(practiceData);

console.log("Delete Leads");

delete practiceData[17];

console.log(practiceData);

var a = "*27";

console.log(a.replace( /\D+/g, ''));
