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

    var dateTimeObj = new Date();
  	var formattedDate = formatDate(dateTimeObj);
    var formattedTime = formatTime(dateTimeObj);
  	console.log(formattedDate);
    console.log(formattedTime);

    // var url = userService.getEnv().firebase + '/users/' + 
    //           userInfo.uid + '/dates/' + formattedDateTime  + 
    //           '/' + trackerObj.$id + '/';
    var url = userService.getEnv().firebase + '/users/' + 
              userInfo.uid + '/dates/' + formattedDate + 
              ' ' + formattedTime;
    console.log(url);
    var ref = new Firebase(url);
    ref.child('activity').set(trackerObj.$id)
    ref.child('hours').set(elasedTimeObj.hours)
    ref.child('minutes').set(elasedTimeObj.minutes)
    ref.child('seconds').set(elasedTimeObj.seconds)
    ref.child('millis').set(elasedTimeObj.millis)
    ref.child('date').set(formattedDate)
    ref.child('time').set(formattedTime)
    ref.child('billable').set(trackerObj.billable)

    	//angularfire way?
    	//ref.$add({});
  };

  var formatDate = function(obj) {
    var yyyy = obj.getFullYear().toString();
    var mm = (obj.getMonth()+1).toString(); // getMonth() is zero-based
    var dd = obj.getDate().toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); 
  };

  var formatTime = function(obj) {
    var hr = obj.getHours().toString();
    var mins = obj.getMinutes().toString();
    var secs = obj.getSeconds().toString();
    return hr + ':' + mins + ':' + secs; 
  };

});
