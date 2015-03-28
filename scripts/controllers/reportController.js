var app = angular.module('nickOfTime');

app.controller('reportController', function ($scope, reportRef, reportService, helperService) {
  $scope.detailed = !$scope.detailed
	////////////////////////////////////////////////////////////////
	$scope.report = reportRef.$asArray();

	////////////////////////////////////////////////////////////////
	$scope.report.$loaded().then(function (report) {

    $scope.stateChange();
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
  $scope.detailed = 'true';
 

  ////////////////////////////////////////////////////////////////
  $scope.stateChange = function() {

    var tempObject = [];

    angular.forEach($scope.report, function (item) {


      var dateFrom = helperService.formatDate($scope.option.fromDate);
      var dateTo = helperService.formatDate($scope.option.toDate);

      if ((item.date >= dateFrom && item.date <= dateTo) && 
        ($scope.type.value.value  === 'all' || item.billable.toString() === $scope.type.value.value)) {
          tempObject.push(item);
      }
    });  

    $scope.reportObject = tempObject;

    if (!$scope.detailed) {
      var tempObj = {};

      $scope.reportObject.forEach(function (report) {

        if (!tempObj[report.activity]) {
          tempObj[report.activity] = {
            activity: report.activity,
            billable: report.billable,
            hours: 0,
            minutes: 0,
            seconds: 0,
            millis: report.millis,
            count: 1
          }
        } else {
          tempObj[report.activity].millis += report.millis;
          tempObj[report.activity].count++;
        }
    
      });

      for(var key in tempObj){
        var timeObj = helperService.calculateTime(tempObj[key].millis);
        tempObj[key].hours = timeObj.hours;
        tempObj[key].minutes = timeObj.minutes;
        tempObj[key].seconds = timeObj.seconds;
      }

      $scope.reportObject = tempObj;
    } 

  };

  ////////////////////////////////////////////////////////////////
  $scope.detailedSummary = function(value) {

    $scope.detailed = value;
    $scope.stateChange();

  };

  ////////////////////////////////////////////////////////////////
  $scope.exportData = function() {

    alasql('SELECT * INTO XLSX("Invoice100.xlsx",{sourcefilename:"Invoice100.xlsx", sheetid:"Billing Information",range:"A17",headers:false}) FROM ?',[$scope.reportObject], function(res) {
      console.log(res);
    });

  };


});	