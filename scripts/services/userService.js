var app = angular.module('nickOfTime');

app.service('userService', function($window) {

    ////////////////////////////////////////////////////////////////
    this.getEnv = function () {
        return $window.env;
    };

    ////////////////////////////////////////////////////////////////
    this.createUser = function (userdata, signupObj) {

      var ref = new Firebase(this.getEnv().firebase + '/users/' + userdata.uid);
      ref.set(userdata);    
      ref.child('username').set(signupObj.username)

    };   

    ////////////////////////////////////////////////////////////////
    this.saveUserInfo = function(email, uid) {

    	//$window.localStorage.setItem('username', email);
      $window.localStorage.setItem('email', email);
      $window.localStorage.setItem('uid', uid);

    };

    ////////////////////////////////////////////////////////////////
    this.getUserInfo = function() {

      var userInfo = {
        email: $window.localStorage.getItem('email'),
        uid: $window.localStorage.getItem('uid'),
        session: $window.localStorage.getItem(this.getEnv().firebaseSession)
      };
    	return userInfo;
    };

    ////////////////////////////////////////////////////////////////
    this.getUserName = function(uid) {

      // var ref = new Firebase(this.getEnv().firebase + '/users/' + uid + '/username');

      // ref.on("value", function(data) {
      //   console.log(data.val());
      // }, function (errorObject) {
      //   console.log("The read failed: " + errorObject.code);
      // });
      
      // // console.log("getUserName: ", uid);
      // // var ref = new Firebase(this.getEnv().firebase + '/users/' + uid + '/username');
      // // var username = ref.child('username');
      // return username;
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
          console.log(signupObj);
          self.createUser(userData, signupObj);         
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
          // var userObject = self.getUserName(authData.uid);
          // console.log(userObject);
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
      $window.localStorage.removeItem('username');

      var startsWith = 'firebase';
      var myLength = startsWith.length;

      Object.keys(localStorage).forEach(function(key){ 
        if (key.substring(0, myLength) == startsWith) {
          localStorage.removeItem(key); 
        } 
      });
    };

});    



