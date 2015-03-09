var app = angular.module('nickOfTime');

app.controller('logoutController', function($scope, $location, userService) {

	////////////////////////////////////////////////////////////////
	//$scope.env = EnvironmentService.getEnv(); 

	////////////////////////////////////////////////////////////////
	$scope.logoutUser = function() {

		userService.logoutUser();

  		$location.path('/login');
	};
	
	////////////////////////////////////////////////////////////////
	$scope.logoutUser();
});