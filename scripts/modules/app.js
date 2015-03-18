var app = angular.module('nickOfTime', ['ngRoute', 'firebase', 'timer', 'App.filers']);

app.config(function($routeProvider){

  ////////////////////////////////////////////////////////////////
	$routeProvider
    .when('/home',{

      templateUrl: 'scripts/templates/home.html'
      
    })

    .when('/about',{

      templateUrl: 'scripts/templates/about.html'
      
    })

    .when('/contact',{

      templateUrl: 'scripts/templates/contact.html'
      
    })

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

    .when('/stats',{

      templateUrl: 'scripts/templates/stats.html',
      controller: 'statsController'
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
    	redirectTo: '/home'
  	});
});

////////////////////////////////////////////////////////////////
app.run(function($rootScope, $location, userService) {


	$rootScope.$on('$routeChangeStart', function(event, next, current){

    switch (next.$$route.originalPath) {
      case '/home':
        if (current.$$route.originalPath !== '/home') {$location.path('/home')};
        break; 
      case '/signup':
        if (current.$$route.originalPath !== '/signup') {$location.path('/signup')};
        break; 
      default: 
        var loggedIn = userService.getUserAuth();
        if (!loggedIn) {
          if (current.$$route.originalPath !== '/login') {$location.path('/login')};
        }
    }

  })
});

