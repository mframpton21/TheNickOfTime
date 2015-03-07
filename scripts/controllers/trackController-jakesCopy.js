var app = angular.module('nickOfTime');

app.controller('trackController', function ($scope, trackRef) {

	////////////////////////////////////////////////////////////////
	$scope.activities = trackRef.$asArray();
  $scope.timerRunning = false;
  $scope.timerStart = false;
  $scope.startItem = {};
  $scope.stopItem = {};

	////////////////////////////////////////////////////////////////
	$scope.activities.$loaded().then(function (activities) {
    //console.log("Act: ", activities);
  });

  $scope.startTimer = function (itemObj){

    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
    $scope.timerStart = true;
    $scope.startItem = itemObj;
    $scope.style = "red";
  };

  $scope.buttonSelected = [];

  $scope.setButtonSelected = function(index){
  
  }

  $scope.stopTimer = function (itemObj){

    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
    $scope.timerStart = false;
    $scope.stopItem = itemObj;
    $scope.style = "white";
  };

  $scope.clearTimer = function (itemObj){

    $scope.$broadcast('timer-clear');
    $scope.timerRunning = false;
    $scope.timerStart = false;
    $scope.stopItem = itemObj;
  };

  $scope.resumeTimer = function (itemObj){

    $scope.$broadcast('timer-resume');
    $scope.timerRunning = true;
    $scope.timerStart = true;
    $scope.startItem = itemObj;
  };

  $scope.$on('timer-stopped', function (event, data){
    $scope.elapseTime = data;
    console.log('Timer Stopped - data = ', data);
  });

  $scope.timeTracker = function(itemObj) {

    console.log("timerRunning: ", $scope.timerRunning);


    switch ($scope.timerRunning) {
      case false:
        $scope.startTimer(itemObj);
        console.log("Tracking: ", itemObj);
        break;
      case true:
        if (itemObj === $scope.startItem) {
          $scope.stopTimer(itemObj);
          //Write itemObj to firebase via service
          console.log("Item stopped to write: ", itemObj);
        } else {
          //Stop the timer
          $scope.stopTimer($scope.startItem);
          console.log("Stoped Item: ", $scope.startItem);
          //Grab the data object
          console.log("elapseTime: ", $scope.elapseTime);
          //Write $scope.startItem to firebase via service
          console.log("Item to write: ", $scope.startItem);
          //Start the timer
          $scope.startTimer(itemObj);
          console.log("Tracking Item: ", itemObj);
        }
        break;
      default:
        alert ("Invalid time running value.");
        break;
    }







    // if ($scope.timerRunning === false) {
    //   if (itemObj === $scope.startItem) {
    //     $scope.resumeTimer(itemObj);  
    //   } else {
    //     $scope.startTimer(itemObj);
    //   }

    // } else if (itemObj === $scope.startItem) {
    //   $scope.clearTimer(itemObj);
    //   //Write itemObj to firebase via service

    //   console.log("Current: ", itemObj);
    //   console.log("Running: ", $scope.startItem);
    //   //$scope.stopTimer(itemObj);
    // } else {
    //   //Stop the timer
    //   $scope.stopTimer(itemObj);
    //   //Grab the data object
    //   console.log("elapseTime: ", $scope.elapseTime);
    //   //Write $scope.startItem to firebase via service
      
    //   //Start the timer
    //   $scope.startTimer(itemObj);

    // }

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
