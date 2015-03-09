var app = angular.module('nickOfTime');

app.service('userService', function($window) {

    ////////////////////////////////////////////////////////////////
    this.getEnv = function () {
        return $window.env;
    };

    ////////////////////////////////////////////////////////////////
    //https://thenickoftime.firebaseio.com/rest/saving-data/fireblog/posts.json
    this.createUser = function (userdata) {

      var ref = new Firebase(this.getEnv().firebase + '/users/' + userdata.uid);
      //angularfire way?
      //ref.$add({});

      //manual way looks something like this
      ref.set(userdata);

    };   

    ////////////////////////////////////////////////////////////////
    this.saveUserInfo = function(email, uid) {

    	$window.localStorage.setItem('email', email);
      $window.localStorage.setItem('uid', uid);

    };

    ////////////////////////////////////////////////////////////////
    this.getUserInfo = function() {

      var userInfo = {
        email: $window.localStorage.getItem('email'),
        uid: $window.localStorage.getItem('uid')
      };
    	return userInfo;
    };

    ////////////////////////////////////////////////////////////////
    this.signupUser = function(signupObj) {

      var ref = new Firebase(this.getEnv().firebase);
      var self = this;

      ref.createUser({

        email    : signupObj.email,
        password : signupObj.password
      }, 
      function(error, userData) {

        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          self.createUser(userData);         
        }
      });
    };      

    ////////////////////////////////////////////////////////////////
    this.loginUser = function(loginObj) {

      var ref = new Firebase(this.getEnv().firebase);
      var self = this;
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
          self.saveUserInfo(loginObj.email, authData.uid);
  			}
		  },
      {remember: stayLoggedin
      });
    };  

    ////////////////////////////////////////////////////////////////  
    this.logoutUser = function() {

      var ref = new Firebase(this.getEnv().firebase);

      // Unauthenticate the client
      ref.unauth();

      $window.localStorage.removeItem('email');
      $window.localStorage.removeItem('uid');

      var startsWith = 'firebase';
      var myLength = startsWith.length;

      Object.keys(localStorage).forEach(function(key){ 
        if (key.substring(0, myLength) == startsWith) {
          localStorage.removeItem(key); 
        } 
      });
    };

});

