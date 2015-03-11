var app = angular.module('App.filers', []);

app.filter('filterByType', [function () {

  return function (report, selectedTypes) {

    if (report) {
      var tempReport = [];
      if(selectedTypes.value !== 'all'){
          angular.forEach(report, function (item) {
              if (item.billable === selectedTypes.value) {
                  tempReport.push(item);
              }
          });
          return tempReport;
      }else{
          return report;
      }
    }
  };

}]);

app.filter('filterByDate',[function(){
    return function(report, date){
        console.log(date);
        if(date){
            angular.forEach(report,function(item){

            });
        }else{
            return report;
        }

    }
}]);