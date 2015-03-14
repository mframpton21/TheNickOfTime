var app = angular.module('nickOfTime');

app.controller('reportController', function ($scope, reportRef, reportService) {
  $scope.detailed = !$scope.detailed
	////////////////////////////////////////////////////////////////
	$scope.report = reportRef.$asArray();

	////////////////////////////////////////////////////////////////
	$scope.report.$loaded().then(function (report) {

  });

	////////////////////////////////////////////////////////////////
	$scope.selectedTypes = [];
	$scope.reportType = [{
    id: 1,
    name: 'All',
    value: 'all'
  }, {
    id: 2,
    name: 'Billable',
    value: 'true'
  }, {
    id: 3,
    name: 'Not Billable',
    value: 'false'
  }];

  ////////////////////////////////////////////////////////////////
  $scope.type = {};
  $scope.type.value = $scope.reportType[0];

  var dateObj = new Date();
  $scope.option = {};
  $scope.option.fromDate = new Date(dateObj.setDate(dateObj.getDate() - 7));
  $scope.option.toDate = new Date();

});	