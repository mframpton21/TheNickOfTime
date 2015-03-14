var app = angular.module('nickOfTime');

app.directive('navbar', function(){
	return {
      restrict: 'E',
      templateUrl: 'scripts/templates/navbar.html',
      controller: 'NavbarController'
  }
});

app.directive('detailed', function(){
  return {
      restrict: 'E',
      templateUrl: 'scripts/templates/detailedReport.html',
      controller: 'ReportDetailController'
  }
});

app.directive('summary', function(){
  return {
      restrict: 'E',
      templateUrl: 'scripts/templates/summaryReport.html',
      controller: 'ReportSummaryController'
  }
});