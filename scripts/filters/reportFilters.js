var app = angular.module('App.filers', []);

app.filter('filterByOptions', [function () {

  return function (report, selectedType, option) {

    var fromDate; 
    var toDate;

    if (option && option.fromDate && option.toDate) {
      fromDate = formatDate(option.fromDate);
      toDate = formatDate(option.toDate);
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

}]);

var formatDate = function(obj) {
  var yyyy = obj.getFullYear().toString();
  var mm = (obj.getMonth()+1).toString(); // getMonth() is zero-based
  var dd = obj.getDate().toString();
  return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); 
};
