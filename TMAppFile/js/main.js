var url = "http://localhost";
var c_key = "tutrPfbNck01gKotT4A8j6pGBRe";

var app = angular.module('TMApp', [
  'ngRoute', 'ngResource'
]);

/**
 * Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/",
        {   templateUrl: "html/login.html",
            controller: "LoginCtrl"
        })
    .when("/home",
        {   templateUrl: "html/home.html",
            controller: "HomeCtrl"
        })
    // else 404
    .otherwise("/404",
        {   templateUrl: "html/404.html",
            controller: "PageCtrl"
        });
}]);

/**
 * Controller for login.
 */
app.controller('LoginCtrl', function ($scope, $resource, $location, $timeout) {
    $scope.errorMsg="";

    var loginResource = $resource(url+'/login');

    $scope.login = function(){
        $scope.errorMsg="";


        // check for invalid data.
        if($scope.username === undefined || $scope.username == ""
            || $scope.password == "" || $scope.password === undefined){
            $scope.errorMsg = "Please input Username/Password.";
        } else {
            // request to validate login.
            loginResource.save({username: $scope.username, password: $scope.password, ip: ip}, function(response){
                if(response.res){
                    $scope.errorMsg = "Login Successful!!!";
                    $timeout(function(){
                        // redirect on successful login.
                        $location.path('/home/'+ $scope.username);
                    }, 500);
                } else {
                    $scope.errorMsg = "Username/Password incorrect!";
                }
            });
        }
    }
});
