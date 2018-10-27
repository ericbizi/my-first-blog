var app = angular.module('angjs', []);

app.controller('MainController', function($scope, $http) {

  var onUserComplete = function(response) {

    $scope.user = response.data;
    $http.get($scope.user.repos_url)
      .then(onRepos, onError);
  };
  var onRepos = function(response) {
    $scope.repos = response.data;
  };

  var onError = function(reason) {
    $scope.error = "Oops. Could not fetch the user.";
  };
  $scope.search = function(username) {
    $http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);

  };
  $scope.username = '';
  $scope.repoSortOrder = "-stargazers_count";


});

app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});
