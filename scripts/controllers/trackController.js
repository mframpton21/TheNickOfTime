var app = angular.module('nickOfTime');

app.controller('trackController', function ($scope, trackRef) {

	////////////////////////////////////////////////////////////////
	var trackStyle = "glyphicon glyphicon-pause";
  var nonTrackStyle = "glyphicon glyphicon-play";
  $scope.activities = trackRef.$asArray();
  $scope.timerRunning = false;
  $scope.timerStart = false;
  $scope.startItem = {};
  $scope.stopItem = {};


	////////////////////////////////////////////////////////////////
	$scope.activities.$loaded().then(function (activities) {

    for (obj1 in activities) {
      var actProp = activities[obj1]; 
      for (obj2 in actProp) {
        if (obj2 === '$value') {
          console.log(obj1 + ' ' + obj2 + ' ' + actProp[obj2]);
          actProp.style = nonTrackStyle;
        }
      }
    }
    // angular.forEach(activities, function(nonTrackStyle, style) {
    //   activities.push(style + ': ' + nonTrackStyle);
    // });
    console.log("Act: ", activities);
  });

  $scope.startTimer = function (itemObj){

    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
    $scope.timerStart = true;
    $scope.startItem = itemObj;
    itemObj.style = trackStyle;
    //$scope.style = "red";
  };

  $scope.stopTimer = function (itemObj){

    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
    $scope.timerStart = false;
    $scope.stopItem = itemObj;
    itemObj.style = nonTrackStyle;
    //$scope.style = "white";
  };

  $scope.$on('timer-stopped', function (event, data){
    $scope.elapseTime = data;
    console.log('Timer Stopped - data = ', data);
  });

  $scope.timeTracker = function(itemObj, index) {

    console.log("timerRunning: ", $scope.timerRunning);
    console.log("index: ", + index);

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

  };

  //https://docs-examples.firebaseio.com/rest/saving-data/fireblog/posts.json
  $scope.postTrack = function (username, text) {
    $scope.comments.$add({
      username: username.email,
      text: text
    });
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
