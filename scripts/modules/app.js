var app = angular.module('nickOfTime', ['ngRoute', 'firebase', 'timer']);

app.config(function($routeProvider){

  ////////////////////////////////////////////////////////////////
	$routeProvider
  	.when('/login',{

    	templateUrl: 'scripts/templates/login.html',
    	controller: 'loginController'
  	})

    .when('/logout',{

      templateUrl: 'scripts/templates/logout.html',
      controller: 'logoutController'
    })

    .when('/signup',{

      templateUrl: 'scripts/templates/signup.html',
      controller: 'signupController'
    })

  	.when('/track', {
  		templateUrl: 'scripts/templates/track.html',
  		controller: 'trackController',
      resolve: {
        trackRef: function (trackService) {
            return trackService.getUserActivity();
        }
      }
	  })

    .when('track/:trackId', {
      templateUrl: 'scripts/templates/track.html',
      controller: 'trackController',
      resolve: {
        trackRef: function (trackService, $route) {
          return trackService.startTracker($route.current.params.trackId);
        }
      } 
    })

    .when('/report', {
      templateUrl: 'scripts/templates/report.html',
      controller: 'reportController',
      resolve: {
        reportRef: function (reportService) {
          return reportService.getReportActivity();
        }
      }
    })    

    .when('/history', {
      templateUrl: 'scripts/templates/history.html',
      controller: 'historyController',
    })

    .when('/events', {
      templateUrl: 'scripts/templates/events.html',
      controller: 'eventsController'
    })

  	.otherwise({
    	redirectTo: '/login'
  	});
});

////////////////////////////////////////////////////////////////
// TODO: Need to implement the $routeChangeStart event 
// and verify that the user is still logged in... 
// if not route to login 
app.run(function($rootScope, $location, userService) {


	$rootScope.$on('$routeChangeStart', function(event, next, current){

    var ref = new Firebase(userService.getEnv().firebase);
    var authData = ref.getAuth();

    if (authData) {
      console.log("Authenticated user with uid:", authData.uid);
    } else {
      console.log("User is no longer authenticated with firebase");
      userService.logoutUser();
      $location.path('/login');
    }

  })
});

