var app = angular.module('App.filers', []);

app.filter('filterByType', [function () {

  return function (report, selectedTypes) {

  	var tempReport = [];

  	//console.log("Filter: ", report, selectedTypes);

  	angular.forEach(report, function (item) {
  		console.log(item, selectedTypes);
  		if (item.billable === selectedTypes.value) {
  			console.log("In if");
  			tempReport.push(value);
  		} else {
  			return report;
  		}

  	});

      
	};

}]);