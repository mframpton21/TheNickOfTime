var app = angular.module('nickOfTime');

app.service('reportService', function(userService, $firebase) {

	////////////////////////////////////////////////////////////////
  this.getReportActivity = function () {

  	var userInfo = userService.getUserInfo();
    
    var url = userService.getEnv().firebase + '/users/' + userInfo.uid + '/dates/';

    return $firebase(new Firebase(url));
    
  };

  ////////////////////////////////////////////////////////////////

});	