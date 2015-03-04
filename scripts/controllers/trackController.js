var app = angular.module('nickOfTime');

app.controller('trackController', function ($scope, trackRef) {

	////////////////////////////////////////////////////////////////
	$scope.activities = trackRef.$asArray();
  $scope.timerRunning = true;

	////////////////////////////////////////////////////////////////
	$scope.activities.$loaded().then(function (activities) {
    console.log("Act: ", activities);
  });

  $scope.startTimer = function (){

    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
  };

  $scope.stopTimer = function (){

    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
  };

  $scope.$on('timer-stopped', function (event, data){
    console.log('Timer Stopped - data = ', data);
  });

  $scope.startTracker = function(obj) {

    alert("Tracking: " + obj.$value + ":" + obj.$id);
  };

	////////////////////////////////////////////////////////////////
	// $scope.createThread = function (username, title) {
 //   	$scope.activities.$add({
 //   		username: username.email,
 //   		title: title
 //   	});
 //  };

  ////////////////////////////////////////////////////////////////
});
