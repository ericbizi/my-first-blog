var app = angular.module('angjs', []);

app.controller('MainController', function($scope, $http, $interval, $log,
  $anchorScroll, $location) {

  var onUserComplete = function(response) {

    $scope.user = response.data;
    $http.get($scope.user.repos_url)
      .then(onRepos, onError);
  };
  var onRepos = function(response) {
    $scope.repos = response.data;
    $location.hash("userDetails");
    $anchorScroll();
  };

  var onError = function(reason) {
    $scope.error = "Oops. Could not fetch the user.";
  };
  // A function that will decrement the count
  var decrementCountdown = function() {
    $scope.countdown -= 1;
    if ($scope.countdown < 1) {
      $scope.search($scope.username);
    }
  };
  var countdownInterval = null;
  var startCountdown = function() {
    countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown)
  };

  $scope.search = function(username) {
    $log.info("Searching for " + username);
    $http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);
    if (countdownInterval) {
      $interval.cancel(countdownInterval);
      $scope.countdown = null;
    }

  };
  $scope.username = 'angular';
  $scope.repoSortOrder = "-stargazers_count";
  $scope.countdown = 10;
  startCountdown();

});


app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});
