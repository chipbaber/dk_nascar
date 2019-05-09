'user strict';
var sql = require('./db.js');

//define the queries for the REST Services

//Driver object constructor
var Driver = function(driver){
    this.name = driver.name;
    this.number = driver.number;
};


Driver.getAllDrivers = function getAllDriver(result) {
        sql.query("Select * from drivers", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('Drivers : ', res);

                 result(null, res);
                }
            });
};



Driver.createDriver = function createUser(newDriver, result) {
        sql.query("INSERT INTO drivers set ?", newDriver, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};

Driver.getDriverById = function createUser(driverId, result) {
        sql.query("select * from drivers where number = ?", driverId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};


Driver.updateById = function(id, driverDetail, result){
  sql.query("UPDATE drivers SET ? WHERE number = ?", [driverDetail, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
Driver.remove = function(id, result){
     sql.query("DELETE FROM drivers WHERE number = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            });
};

Driver.removeAll = function(result){
                 sql.query("DELETE FROM drivers",  function (err, res) {

                            if(err) {
                                console.log("error: ", err);
                                result(null, err);
                            }
                            else{
                             result(null, res);
                            }
                        });

};

Driver.addAllDrivers = function(all_driver_data, result){
//get the numeric key for each item in the array. ["0", "1",] will be output format
var worked = true;
var i=0;
console.log("app Model Driver.addAllDrivers ");
var add_driver;
 var keys = Object.keys( all_driver_data );
 for( var i = 0,length = keys.length; i < length; i++ ) {
     //place into js object
     add_driver = {"name": all_driver_data[keys[i]].driver_name,"number":all_driver_data[keys[i]].vehicle_number};
     console.log("Built new driver:" + JSON.stringify(add_driver));
     //validate info exists
     if(!add_driver.name || !add_driver.number){
              res.status(400).send({ error:true, message: 'Please provide Driver and Number' });
          }
      else{
        console.log("Inserting new driver");
       //insert values one at a time
        sql.query("INSERT INTO drivers set ?", add_driver, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    console.log("Breaking for loop on error;")
                    worked=false;

                }
                else{
                    console.log("Row Inserted with id: " + res.insertId);
                    i++;
                }
            });
      }
 }

 if (worked) {
   result(null, {message:i+" rows inserted into drivers"});
 }
 else {
   result(null, "error on insert");
 }

};

module.exports= Driver;
