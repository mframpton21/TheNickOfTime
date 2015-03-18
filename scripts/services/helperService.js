var app = angular.module('nickOfTime');

app.service('helperService', function() {

	////////////////////////////////////////////////////////////////
  this.formatDate = function(obj) {
    var yyyy = obj.getFullYear().toString();
    var mm = (obj.getMonth()+1).toString(); // getMonth() is zero-based
    var dd = obj.getDate().toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); 
  };

	////////////////////////////////////////////////////////////////
  this.formatTime = function(obj) {
    var hr = obj.getHours().toString();
    var mins = obj.getMinutes().toString();
    var secs = obj.getSeconds().toString();
    return (hr[1]?hr:"0"+hr[0]) + ':' + 
    			 (mins[1]?mins:"0"+mins[0]) + ':' + 
    			 (secs[1]?secs:"0"+secs[0]); 
  };

	////////////////////////////////////////////////////////////////
  this.calculateTime = function(millis) {

    var hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4),
        secs = Math.floor((millis % 6e4) / 1000);

    var timeObj = {
      hours: hours,
      minutes: mins,
      seconds: secs
    };    
    return timeObj;
  };

  ////////////////////////////////////////////////////////////////

});

