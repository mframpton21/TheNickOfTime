var app = angular.module('nickOfTime');

app.controller('ReportSummaryController', function ($scope, reportService, helperService) {

	////////////////////////////////////////////////////////////////
	console.log("ReportSummaryController: ", $scope.report);

      var reportObj = {};
      var firstTime = true;

    	//debugger;
      angular.forEach($scope.report, function (report) {
      	console.log(report);

      	if (firstTime) {
      		var reportObj = {
      			activity: report.activity,
			    	billable: report.billable,
			    	hours: 0,
				 		millis: 0,
						minutes: 0,
						seconds: 0,
			    	count: 0
      		};
					console.log(reportObj);    
      	};

      	firstTime = false;

       	angular.forEach(reportObj, function (summary) {
       		console.log("Summary: ", summary);
    			if (summary.activity === report.activity) {
    				console.log("Item: " + report.activity + " found.");
    				summary.millis += report.millis;
    				summary.count ++;
  				} else {
  					console.log("Item: " + report.activity + " not found.");
      			reportObj.activity = report.activity;
			    	reportObj.billable = report.billable;
			    	reportObj.hours = 0;
				 		reportObj.millis = summary.millis;
						reportObj.minutes = 0;
						reportObj.seconds = 0;
			    	reportObj.count = 1;
  				}
				});
			});      	
			console.log("Results: ", reportObj);

			//Loop through reportObj and update hours, minutes, and seconds 
			//by calling helper method; calculateTime(millis)

			//start loop and grab millis
			//var timeObject = calculateTime(millis) 
			//update reportObj.hours = timeObject.hours;
			//update reportObj.minutes = timeObject.minutes;
			//update reportObj.seconds = timeObject.seconds;

			//$scope.summaryReport = reportObj;

});	
