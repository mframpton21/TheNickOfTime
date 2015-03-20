var app = angular.module('App.filers', []);

app.filter('filterByOptions', function(helperService) {

  return function (report, selectedType, option, detailed) {

    // console.log("In reportFilter");
    // console.log("report ", report);


    // if (!detailed) {

    //   var tempObject = [];

    //   angular.forEach(report, function (item) {

    //     console.log("item ", item);

    //     dateFrom = helperService.formatDate(option.fromDate);
    //     dateTo = helperService.formatDate(option.toDate);

    //     if (item.date >= dateFrom && item.date <= dateTo) {
    //         tempObject.push(item);
    //     }
    //   });  

    //   console.log("tempObject ", tempObject);
      


    
    //   $scope.report = {};
      

    //   tempObject.forEach(function (item) {

    //     console.log("before", item);

    //     if (!$scope.report[item.activity]) {
    //       $scope.report[item.activity] = {
    //         activity: item.activity,
    //         billable: item.billable,
    //         //date: item.date;
    //         hours: 0,
    //         minutes: 0,
    //         seconds: 0,
    //         millis: item.millis,
    //         count: 1
    //       }
    //     } else {
    //       $scope.report[item.activity].millis += item.millis;
    //       $scope.report[item.activity].count++;
    //     }
    
    //   });

    //   console.log("after", $scope.report);

    //   for(var key in $scope.report){
    //     var timeObj = helperService.calculateTime($scope.report[key].millis);
    //     $scope.report[key].hours = timeObj.hours;
    //     $scope.report[key].minutes = timeObj.minutes;
    //     $scope.report[key].seconds = timeObj.seconds;
    //   }

    // }




    var fromDate; 
    var toDate;

    if (detailed && option && option.fromDate && option.toDate) {
      fromDate = helperService.formatDate(option.fromDate);
      toDate = helperService.formatDate(option.toDate);
    }

    if (report) {
      var tempReport = [];
    	
      angular.forEach(report, function (item) {

        if (fromDate && toDate) {
          if ((item.billable === selectedType.value || selectedType.value === 'all') &&
              (item.date >= fromDate && item.date <= toDate)) {
            tempReport.push(item);
          } 
        } else if (item.billable === selectedType.value || selectedType.value === 'all') {
            tempReport.push(item);          
        }
      });
 			return tempReport;
    }
    return report;
  };

});



