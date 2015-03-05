var app = angular.module('nickOfTime');

app.controller('trackController', function ($scope, trackRef) {

	////////////////////////////////////////////////////////////////
	$scope.activities = trackRef.$asArray();
  $scope.timerRunning = false;

	////////////////////////////////////////////////////////////////
	$scope.activities.$loaded().then(function (activities) {
    console.log("Act: ", activities);
  });

  $scope.startTimer = function (itemObj){

    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
    $scope.timerStart = true;
    $scope.startItem = itemObj;
  };

  $scope.stopTimer = function (itemObj){

    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
    $scope.timerStart = false;
    $scope.stopItem = itemObj;
  };

  $scope.$on('timer-stopped', function (event, data){
    $scope.elapseTime = data;
    console.log('Timer Stopped - data = ', data);
  });

  $scope.timeTracker = function(itemObj) {

    console.log("timerRunning: ", $scope.timerRunning);

    if ($scope.timerRunning === false) {
      $scope.startTimer(itemObj);    
    } else if (itemObj === $scope.startItem) {
      $scope.stopTimer(itemObj);
      //Write itemObj to firebase via service

      console.log("Current: ", itemObj);
      console.log("Running: ", $scope.startItem);
      //$scope.stopTimer(itemObj);
    } else {
      //Stop the timer
      $scope.stopTimer(itemObj);
      //Grab the data object
      console.log("elapseTime: ", $scope.elapseTime);
      //Write $scope.startItem to firebase via service
      
      //Start the timer
      $scope.startTimer(itemObj);

    }

    //alert("Tracking: " + obj.$value + ":" + obj.$id);
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
