'use strict';

var Driver = require('../model/appModel.js');
var PracticeData = require('../model/PracticeData.js');

//bring in https library for rest calls
var Https = require('https');

exports.list_all_drivers = function(req, res) {
  Driver.getAllDrivers(function(err, task) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', task);
    res.send(task);
  });
};



exports.create_a_driver = function(req, res) {
  var new_driver = new Driver(req.body);
  //handles null error
   if(!new_driver.name || !new_driver.number){
            res.status(400).send({ error:true, message: 'Please provide Driver and Number' });
        }
else{

  Driver.createDriver(new_driver, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
}
};


exports.get_a_driver = function(req, res) {
  Driver.getDriverById(req.params.driverId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_driver = function(req, res) {
  console.log("Inside update_a_driver: ");
  console.log("Driver number in parameter is:"+req.params.driverId);
  Driver.updateById(req.params.driverId, new Driver(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_driver = function(req, res) {
  Driver.remove(req.params.driverId, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Driver successfully deleted' });
  });
};

exports.delete_all_drivers = function(req, res) {
    Driver.removeAll(function(err, task) {
      if (err)
      res.send(err);
      res.json({ message: 'All Drivers removed.' });
    });
};

exports.delete_all_drivers = function(req, res) {
    Driver.removeAll(function(err, task) {
      if (err)
      res.send(err);
      res.json({ message: 'All Drivers removed.' });
    });
};

exports.add_drivers_for_race = function(req, res) {
  console.log("Inside exports.add_drivers_for_race");
  console.log("Grabbing driver list from nascar.com");
  var all_driver_data='';
  Https.get('https://www.nascar.com/cacher/2019/1/4783/entryList.json', (resp) => {
  let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log("Driver Data received.");
    all_driver_data=JSON.parse(data);
    //send to function to insert data
    Driver.addAllDrivers(all_driver_data, function(err, task) {
      if (err)
      res.send(err);
      res.json(task);
    });

  });

}).on("error", (err) => {
  console.log("Error getting json from nascar.com: " + err.message);
});


};

//Collect Practice Data from Rest Services
exports.get_practice_data = function(req, res) {
  console.log("Inside exports.get_practice_data");
  PracticeData.getPracticeData(req.params.raceId, req.params.raceYear, function(err, output) {
    if (err)
    res.send(err);
    res.json(output);
  });

};
