var app = angular.module('nickOfTime');

app.service('trackService', function(helperService, userService, $firebase) {

  ////////////////////////////////////////////////////////////////
  var firebaseUrl = userService.getEnv().firebase;
  var userInfo = userService.getUserInfo();


  ////////////////////////////////////////////////////////////////
  this.getUserActivity = function () {

    return $firebase(new Firebase(firebaseUrl + '/users/' + userInfo.uid + '/trackers'));

  };

  ////////////////////////////////////////////////////////////////
  this.postTrackedTime = function(trackerObj, elasedTimeObj) {

    var dateTimeObj = new Date();
  	var formattedDate = helperService.formatDate(dateTimeObj);
    var formattedTime = helperService.formatTime(dateTimeObj);
    var url = userService.getEnv().firebase + '/users/' + 
              userInfo.uid + '/dates/' + formattedDate + 
              ' ' + formattedTime;
    var ref = new Firebase(url);
    ref.child('activity').set(trackerObj.$id)
    ref.child('hours').set(elasedTimeObj.hours)
    ref.child('minutes').set(elasedTimeObj.minutes)
    ref.child('seconds').set(elasedTimeObj.seconds)
    ref.child('millis').set(elasedTimeObj.millis)
    ref.child('date').set(formattedDate)
    ref.child('time').set(formattedTime)
    ref.child('billable').set(trackerObj.billable)
  };

});
