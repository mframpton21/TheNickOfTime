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
    console.log(new Date);

  	var formattedDateTime = formatDateTime(new Date());
  	console.log(formattedDateTime);

    var url = userService.getEnv().firebase + '/users/' + 
              userInfo.uid + '/dates/' + formattedDateTime  + 
              '/' + trackerObj.$id + '/';
    console.log(url);
    var ref = new Firebase(url);
    ref.child('hours').set(elasedTimeObj.hours)
    ref.child('minutes').set(elasedTimeObj.minutes)
    ref.child('seconds').set(elasedTimeObj.seconds)
    ref.child('millis').set(elasedTimeObj.millis)

    	//angularfire way?
    	//ref.$add({});
  };

  var formatDateTime = function(dateObj) {
    var yyyy = dateObj.getFullYear().toString();
    var mm = (dateObj.getMonth()+1).toString(); // getMonth() is zero-based
    var dd = dateObj.getDate().toString();
    var hr = dateObj.getHours().toString();
    var mins = dateObj.getMinutes().toString();
    var secs = dateObj.getSeconds().toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + ' ' + hr + ':' + mins + ':' + secs; 
  };


});
