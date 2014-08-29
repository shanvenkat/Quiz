/* Register angular module with custom name myapp, all other Angular objects will add it to this custom angular module, 
Here Other Anulag objects used are Controller, Service, RouteProvider etc. 
This controller takes care of CRUD Operations */

var myapp = angular.module('myapp', ['ngRoute', "firebase"])
.service('UserService', [function() {
    var sdo = {
        isLogged: false,
        username: ''
    };
    return sdo;
}]);

myapp.config(function ($routeProvider) {
    $routeProvider.                
               
                when('/register/', {
                    templateUrl: '/app/views/register.html',
                    controller: 'registerController'
                }).
                
                when('/login/', {
                    templateUrl: '/app/views/login.html',
                    controller: 'loginController',
                    access: { isFree: true }
                }).

                when('/quiz/', {
                    templateUrl: '/app/views/quiz.html',
                    controller: 'quizController'
                }).

                when('/results/', {
                    templateUrl: '/app/views/results.html',
                    controller: 'resultsController'
                }).                
               
                otherwise({
                    redirectTo: '/login/'
                });
});


           