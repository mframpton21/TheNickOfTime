var app = angular.module('App.filers', []);

app.filter('filterByType', [function () {

  return function (report, selectedTypes) {

    if (report) {
      var tempReport = [];
    	console.log("Filter: ", report, selectedTypes);
      angular.forEach(report, function (item) {
  		  console.log("In forEach ", item, selectedTypes);
  		  if (item.billable === selectedTypes.value) {
  			  console.log("In if");
  			  tempReport.push(item);
          console.log("After push ", tempReport); 
  		  } 
      });
 			return tempReport;
    }
    return report;
  };

}]);