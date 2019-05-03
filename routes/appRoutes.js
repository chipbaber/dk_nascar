'use strict';
//Define the rest services routing
module.exports = function(app) {
  var driverList = require('../controller/appController.js');

  // todoList Routes
  app.route('/drivers')
    .get(driverList.list_all_drivers)
    .post(driverList.create_a_driver);

   app.route('/drivers/:driverId')
    .get(driverList.get_a_driver)
    .put(driverList.update_a_driver)
    .delete(driverList.delete_a_driver);

   app.route('/cleardrivers/')
     .delete(driverList.delete_all_drivers);

   app.route('/buildRace/')
       .post(driverList.add_drivers_for_race);

    };
