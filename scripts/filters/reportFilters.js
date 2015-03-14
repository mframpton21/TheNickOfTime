var app = angular.module('App.filers', []);

app.filter('filterByOptions', function(helperService) {

  return function (report, selectedType, option) {

    var fromDate; 
    var toDate;

    if (option && option.fromDate && option.toDate) {
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



