var app = angular.module('nickOfTime');

app.controller('ReportSummaryController', function ($scope, reportService, helperService) {

	////////////////////////////////////////////////////////////////
  $scope.reportObj = {};

	$scope.report.forEach(function (report) {

		if (!$scope.reportObj[report.activity]) {
			$scope.reportObj[report.activity] = {
				activity: report.activity,
				billable: report.billable,
				hours: 0,
				minutes: 0,
				seconds: 0,
				millis: report.millis,
				count: 1
			}
		} else {
			$scope.reportObj[report.activity].millis += report.millis;
			$scope.reportObj[report.activity].count++;
		}
		
	});

	for(var key in $scope.reportObj){
		var timeObj = helperService.calculateTime($scope.reportObj[key].millis);
		$scope.reportObj[key].hours = timeObj.hours;
		$scope.reportObj[key].minutes = timeObj.minutes;
		$scope.reportObj[key].seconds = timeObj.seconds;
	}

});	
