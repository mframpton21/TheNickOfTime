var app = angular.module('nickOfTime');

app.service('userService', function($window) {

    
    this.getEnv = function () {
        return $window.env;
     }

    this.saveUsername = function(email) {

    	return $window.localStorage.setItem('email', email);
    };

    this.getUsername = function(email) {

    	return $window.localStorage.getItem('email');
    };

    this.loginUser = function(username) {

    	var ref = new Firebase(this.getEnv().firebase;);
    	// var ref = new Firebase("https://brilliant-inferno-3631.firebaseio.com/");
    	console.log(ref);
		ref.authWithPassword({

  			email    : username.email,
  			password : username.password
		}, 
		function(error, authData) {

  			if (error) {
    			console.log("Login Failed!", error);
  			} else {
    			console.log("Authenticated successfully with payload:", authData);
    			this.saveUsername(username.email);
  			}
		});
    };
    
});