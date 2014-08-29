/* Controllers used for Questionnaire screen */

myapp.controller ('registerController', function ($scope, $http, $routeParams,$location) {
    init();
    function init() {   
    }        

    $scope.registeruser = function () {        
        var email = $scope.register.email;
        var password = $scope.register.password;
        $http.post('/registeruser/'+ email +'/' + password + '/')
            .success(function (data) {                                
                $location.path('/login/');              
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });
            $scope.register.email='';
            $scope.register.password='';            
    };    

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };     
    
    $scope.delregister = function () {                       
        $http.delete('/registerdelete/')
            .success(function (data) {                                 
                $location.path('/');              
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });                        
    };
});

myapp.controller('loginController', ['$scope', '$http', '$location', '$rootScope', 'UserService', function($scope, $http, $location, $rootScope, User ) {

init();    
    function init() {  
        $rootScope.notifyUser = "";
    }

    $scope.loginuser = function () {        
        var email = $scope.login.email;
        var password = $scope.login.password; 


        $http.get('/validatelogin/'+ email +'/' + password + '/')
            .success(function (data,status) {

                    if (data[0] == undefined){                            
                            $location.path('/login/' ); 
                            $rootScope.notifyUser = "Something went wrong, Pls Try again";
                            $scope.login.email = "";
                            $scope.login.password = "";                            
                    }
                    else{
                            User.isLogged = true;
                            User.username = $scope.login.email;                    
                            $rootScope.welcomeuser = email;
                            $location.path('/quiz/' ); 
                    }                    
            })
            .error(function (data,status, headers, config) {
                console.log('Error: ' + data);  
                User.isLogged = false;
                User.username = '';              
                // reload the login route
                $location.path('/login/');
            });           
    };    

    $scope.clickCancel = function () {                       
        $scope.login.email = "";
        $scope.login.password = "";                            
        $rootScope.notifyUser = "";
        $location.path('/login/');                
    };
}]);

myapp.controller('quizController', ['$scope', '$http', '$location', '$rootScope', 'UserService', function($scope, $http, $location, $rootScope, User ) {
    init();    
    function init() {  
        
        var resultvalue = "";        
        if (User.isLogged == false)
                { $location.path('/login/'); }
        else
            { $scope.displayloginuser = $rootScope.welcomeuser; }            
    }    
    
    $scope.logout = function () {        
        User.isLogged = false;                       
        $location.path('/login/');                
    };

    $scope.clickCancel = function () {                       
        $location.path('/login/');                
    };

    $scope.clickContinue = function () {            
            
            var points = 0;    
            $rootScope.questonetitle = "Which is not an advantage of using a closure?";
            var strquestoneAnswer = $scope.questone.value;                
            $rootScope.questoneanswer = strquestoneAnswer;

            if (strquestoneAnswer == "c. Private properties and methods"){                                               
                    
                    points = parseInt(points) + 1;
                    $rootScope.questoneresult = "Your Answer " + strquestoneAnswer + "," + " correct" ;
                    $rootScope.questoneCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questoneresult = "Your Answer " + strquestoneAnswer +"," + " incorrect" ;
                    $rootScope.questoneCorrectAnswer = "Correct Answer is: c. Private properties and methods";
                    $location.path('/results/' );  
            }

            $rootScope.questtwotitle = "To create a columned list of twoline email subjects and dates for a masterdetail view, which are the most semantically correct?";
            var strquesttwoAnswer = $scope.questtwo.value;                
            $rootScope.questtwoanswer = strquesttwoAnswer;
            if (strquesttwoAnswer == "c. <ul>+<li>"){                                
                    points = parseInt(points) + 1;
                    $rootScope.questtworesult = "Your Answer " + strquesttwoAnswer + "," + " correct" ;
                    $rootScope.questtwoCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questtworesult = "Your Answer " + strquesttwoAnswer +"," + " incorrect" ;
                    $rootScope.questtwoCorrectAnswer = "Correct Answer is: c. <ul>+<li>";
                    $location.path('/results/' );  
            }      
            
            $rootScope.questthreetitle = "To pass an array of strings to a function, you should not use...";
            var strquestthreeAnswer = $scope.questthree.value;                
            $rootScope.questthreeanswer = strquestthreeAnswer;
            if (strquestthreeAnswer == "b. fn.call(this, stringsArray)"){                                
                    points = parseInt(points) + 1;
                    $rootScope.questthreeresult = "Your Answer " + strquestthreeAnswer + "," + " correct" ;
                    $rootScope.questthreeCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questthreeresult = "Your Answer " + strquestthreeAnswer +"," + " incorrect" ;
                    $rootScope.questthreeCorrectAnswer = "Correct Answer is: b. fn.call(this, stringsArray)";
                    $location.path('/results/' );  
            }

            $rootScope.questfivetitle = 'Given <div id=”outer”><div class=”inner”></div></div>, which of these two is the most performant way to select the inner div?';
            var strquestfiveAnswer = $scope.questfive.value;                
            $rootScope.questfiveanswer = strquestfiveAnswer;
            if (strquestfiveAnswer == 'b. getElementsByClassName("inner")[0]'){                                
                    points = parseInt(points) + 1;
                    $rootScope.questfiveresult = "Your Answer " + strquestfiveAnswer + "," + " correct" ;
                    $rootScope.questfiveCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questfiveresult = "Your Answer " + strquestfiveAnswer +"," + " incorrect" ;
                    $rootScope.questfiveCorrectAnswer = 'Correct Answer is: b. getElementsByClassName("inner")[0]';
                    $location.path('/results/' );  
            }

            $rootScope.questsixtitle = 'Which message will be returned by injecting this service and executing “myService.getMessage()”';
            var strquestsixAnswer = $scope.questsix.value;                
            $rootScope.questsixanswer = strquestsixAnswer;
            if (strquestsixAnswer == 'c. 3'){                                
                    points = parseInt(points) + 1;
                    $rootScope.questsixresult = "Your Answer " + strquestsixAnswer + "," + " correct" ;
                    $rootScope.questsixCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questsixresult = "Your Answer " + strquestsixAnswer +"," + " incorrect" ;
                    $rootScope.questsixCorrectAnswer = 'Correct Answer is: c. 3';
                    $location.path('/results/' );  
            }                        
            var score = parseInt(points)*20;
            $rootScope.totalscore = parseInt(score);            
            
    };  

}]);

myapp.controller('resultsController', ['$scope', '$http', '$location', '$rootScope', 'UserService', function($scope, $http, $location, $rootScope, User ) {
    init();
    function init() {
        if (User.isLogged == false)
                { $location.path('/login/'); }
        else
            { 
                $scope.displayloginuser = $rootScope.welcomeuser;                
                $scope.questonetitle =  $rootScope.questonetitle;     
                $scope.questoneanswer =  $rootScope.questoneanswer;
                $scope.questoneresult =  $rootScope.questoneresult;
             }    
    }

    $scope.logout = function () {
        User.isLogged = false;                       
        $location.path('/login/');                
    };

}]);