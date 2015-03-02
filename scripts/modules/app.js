var app = angular.module('nickOfTime', ['ngRoute', 'firebase']);

app.config(function($routeProvider){

	$routeProvider
  	.when('/login',{

    	templateUrl: 'scripts/login/login.html',
    	controller: 'loginController'
  	})

    .when('/register',{

      templateUrl: 'scripts/register/register.html',
      controller: 'registerController'
    })

  	.when('/threads', {
  		templateUrl: 'threads/threads.html',
  		controller: 'ThreadsCtrl',
  		resolve: {
    		threadsRef: function (ThreadService) {
      			return ThreadService.getThreads();
    		}
  		}
	})

  	.when('thread/:threadId', {
		templateUrl: 'thread/thread.html',
		controller: 'ThreadCtrl',
  			resolve: {
    			threadRef: function (ThreadService, $route) {
      				return ThreadService.getThread($route.current.params.threadId);
    			},
    			commentsRef: function (ThreadService, $route) {
      				return ThreadService.getComments($route.current.params.threadId);
    			}
  			}	
	})

  	.otherwise({
    	redirectTo: '/login'
  	});
});

// app.run(function($rootScope, $location, EnvironmentService) {


// 	$rootScope.$on('$routeChangeStart', function(event, next, current){

// 		var username = EnvironmentService.getUsername();

//     	if (username) {
//     		$rootScope.username = username;  
//     	} else {
//     		$location.path('/login');   		
//     	}
//   	})
// });

