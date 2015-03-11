var app = angular.module('nickOfTime');

app.controller('loginController', function($scope, $location, userService) {

	////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////
	$scope.loginUser = function(loginObj) {

		userService.loginUser(loginObj);

		//TODO: Need to handle error in login

  		$location.path('/track');
	};
	
	////////////////////////////////////////////////////////////////
});