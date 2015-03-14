var app = angular.module('nickOfTime');

app.controller('NavbarController', function($scope, userService){	

	$scope.loggedIn = false;

	var checkStatus = function() {
		var loggedIn = userService.getUserAuth();
		if(loggedIn){
			$scope.loggedIn = true;
		}
	}();

});
