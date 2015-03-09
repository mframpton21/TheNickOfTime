var app = angular.module('nickOfTime');

app.controller('reportController', function ($scope, reportRef, reportService) {

	////////////////////////////////////////////////////////////////
	$scope.report.$loaded().then(function (report) {

    console.log("Report: ", report);
  });

  ////////////////////////////////////////////////////////////////


});	