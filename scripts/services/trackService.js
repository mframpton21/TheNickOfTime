var app = angular.module('nickOfTime');

app.service('trackService', function(userService, $firebase) {

  ////////////////////////////////////////////////////////////////
  var firebaseUrl = userService.getEnv().firebase;
  var userInfo = userService.getUserInfo();


  ////////////////////////////////////////////////////////////////
  this.getUserActivity = function () {
    //return $firebase(new Firebase(firebaseUrl + '/activity'));

    return $firebase(new Firebase(firebaseUrl + '/users/' + userInfo.uid + '/trackers'));

  };

  ////////////////////////////////////////////////////////////////
  this.postTrackedTime = function(trackerObj, elasedTimeObj) {

  	console.log("In postTrackedTime");
  	
 
  	console.log(userInfo);
  	console.log(trackerObj);
  	console.log(elasedTimeObj);

  	var dateObj = new Date();
  	var formattedDate = dateObj.format("yyyy-mm-dd")
  	var year = dateObj.getFullYear();
  	var month = dateObj.getMonth();
  	var day = dateObj.getDate();
  	//var formattedDate = year + '-' + month + '-' + day;

  	console.log(formattedDate);

  	//var ref = new Firebase(userService.getEnv().firebase + '/users/' + userdata.uid);
    	//angularfire way?
    	//ref.$add({});

    	//manual way looks something like this
    	//ref.set(userdata);
  };

});
