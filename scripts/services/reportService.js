var app = angular.module('nickOfTime');

app.service('reportService', function(userService, $firebase) {

	////////////////////////////////////////////////////////////////
  this.getReportActivity = function () {

  	var userInfo = userService.getUserInfo();
    
    var url = userService.getEnv().firebase + '/users/' + userInfo.uid + '/dates/';
    console.log(url);

    return $firebase(new Firebase(url));
    
  };

  ////////////////////////////////////////////////////////////////

});	