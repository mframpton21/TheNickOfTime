var app = angular.module('nickOfTime');

app.controller('countDownController', function ($scope) {

	////////////////////////////////////////////////////////////////
	var trackStyle = "glyphicon glyphicon-pause";
  var nonTrackStyle = "glyphicon glyphicon-play";

  $scope.timerRunning = false;
  $scope.timerStart = false;
  $scope.countDown = {};
  $scope.countDown.style = nonTrackStyle;
  $scope.countDown.toDate = new Date();
  var x = new Date($scope.countDown.toDate).getTime();
  $scope.timeObj = {};
  $scope.timeObj.time = x;

  $scope.days = 0;
  $scope.hours = 0;
  $scope.minutes = 0;
  $scope.seconds = 0;

  ////////////////////////////////////////////////////////////////
  // stop timer envent to capture timer data
  $scope.$on('timer-stopped', function (event, data){
    $scope.elapseTime = data;
    //console.log('Timer Stopped - data = ', data);
  });  

  ////////////////////////////////////////////////////////////////
  $scope.clearTimer = function (){

    $scope.$broadcast('timer-clear');
    $scope.timerRunning = false;
    $scope.timerStart = false;
    $scope.countDown.style = nonTrackStyle;
  };

	////////////////////////////////////////////////////////////////
  $scope.startTimer = function (){

    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
    $scope.timerStart = true;
    $scope.countDown.style = trackStyle;
  };

  ////////////////////////////////////////////////////////////////
  $scope.stopTimer = function (){

    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
    $scope.timerStart = false;
    $scope.countDown.style = nonTrackStyle;
  };

  ////////////////////////////////////////////////////////////////
  $scope.resumeTimer = function (){

    $scope.$broadcast('timer-resume');
    $scope.timerRunning = false;
    $scope.timerStart = false;
    $scope.countDown.style = nonTrackStyle;
  };

  ////////////////////////////////////////////////////////////////
  $scope.countdownTimer = function(value) {

    console.log($scope.countDown.toDate);
  	var countdownDate = new Date($scope.countDown.toDate).getTime();
  	console.log(countdownDate);
  	$scope.timeObj.time = countdownDate;
    $scope.endDate = new Date(countdownDate);
//debugger;

    switch (value) {
      case 'dateChange':
        if ($scope.timerRunning) {
          //$scope.clearTimer();
          $scope.startTimer();
        }
        break;
      case 'playPause':
        if ($scope.timerRunning) {
          $scope.stopTimer();
        } else {
          $scope.startTimer();
        }
        break;
    }
  };

});