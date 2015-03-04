var app = angular.module('nickOfTime');

app.service('userService', function($window) {

    ////////////////////////////////////////////////////////////////
    this.getEnv = function () {
        return $window.env;
    };

    ////////////////////////////////////////////////////////////////
    this.saveUsername = function(email) {

    	return $window.localStorage.setItem('email', email);
    };

    ////////////////////////////////////////////////////////////////
    this.getUsername = function() {

    	return $window.localStorage.getItem('email');
    };

    ////////////////////////////////////////////////////////////////
    this.createUser = function(signupObj) {

      var ref = new Firebase(this.getEnv().firebase);

      ref.createUser({

        email    : signupObj.email,
        password : signupObj.password
      }, 
      function(error, userData) {

        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    };      

    ////////////////////////////////////////////////////////////////
    this.loginUser = function(loginObj) {

      var ref = new Firebase(this.getEnv().firebase);
      var stayLoggedin = (loginObj.keepLoggedin ? "default" : "sessionOnly");

		  ref.authWithPassword({

  		  email    : loginObj.email,
  			password : loginObj.password
		  }, 
		  function(error, authData) {

  			if (error) {
    			console.log("Login Failed!", error);
  			} else {
    			console.log("Authenticated successfully with payload:", authData);
  			}
		  },
      {remember: stayLoggedin
      });
    };  

    ////////////////////////////////////////////////////////////////  
});