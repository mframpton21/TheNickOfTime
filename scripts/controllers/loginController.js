var app = angular.module('nickOfTime');

app.controller('loginController', function($scope, $location, userService) {

	////////////////////////////////////////////////////////////////
	//$scope.env = EnvironmentService.getEnv(); 

	////////////////////////////////////////////////////////////////
	$scope.loginUser = function(loginObj) {

		userService.loginUser(loginObj);

		//TODO: Need to handle error in login
		//remember that there needs to be login in 
		//the $routeChangeStart event of the app.js file
		//may be some cross-over.
		//userService.saveUsername(loginObj.email, uid...);

  		$location.path('/track');
	};
	
	////////////////////////////////////////////////////////////////
});