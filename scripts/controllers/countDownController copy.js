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

  $scope.timeObj = {};
  $scope.timeObj.time = new Date($scope.countDown.toDate).getTime();
  //$scope.timeObj.time = 1451628000000;
  $scope.days = 0;
  $scope.hours = 0;
  $scope.minutes = 0;
  $scope.seconds = 0;

  

  // console.log($scope.countDown.toDate);
  // console.log($scope.countDown.toDate.getTime());


  ////////////////////////////////////////////////////////////////
  // stop timer envent to capture timer data
  $scope.$on('timer-stopped', function (event, data){
    $scope.elapseTime = data;
    console.log('Timer Stopped - data = ', data);
  });  

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
  $scope.countdownTimer = function() {

  	//debugger;

  	var countdownDate = new Date($scope.countDown.toDate).getTime();
  	console.log(countdownDate);
  	//$scope.timeObj = {};
  	$scope.timeObj.time = countdownDate;
  	$scope.endDate = new Date(countdownDate);

  	if ($scope.timerRunning) {
  		$scope.stopTimer();
  	} else {
  		$scope.startTimer();
  	}
  };

  //$scope.startTimer();

});