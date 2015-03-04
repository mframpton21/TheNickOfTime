var app = angular.module('nickOfTime');

app.service('eventsService', function(userService, $firebase) {

    var firebaseUrl = userService.getEnv().firebase;

    this.getThreads = function () {
      return $firebase(new Firebase(firebaseUrl + '/threads'));
    };

    this.getThread = function (threadId) {
        return $firebase(new Firebase(firebaseUrl + '/threads/' + threadId));
    };

    this.getComments = function (threadId) {
        return $firebase(new Firebase(firebaseUrl + '/threads/' + threadId + '/comments'));
    };
});
