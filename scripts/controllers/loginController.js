var app = angular.module('nickOfTime');

app.controller('loginController', function($scope, $location, EnvironmentService) {

	//$scope.env = EnvironmentService.getEnv(); 

	// $scope.logMeIn = function(username) {

	// 	alert(username);
	// 	EnvironmentService.saveUsername(username);

 //  		$location.path('/threads');
	// };

	$scope.loginUser = function(username) {

		//console.log(username);
		EnvironmentService.loginUser(username);

  		//$location.path('/threads');
	};
	
});