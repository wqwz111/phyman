angular.module('phyman.user')
.config(['$httpProvider','jwtInterceptorProvider',function($httpProvider,jwtInterceptorProvider) {
    jwtInterceptorProvider.urlParam = 'access_token';
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('id_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
}])
.factory('AuthService',['$http','$q','$rootScope','jwtHelper',
    function($http,$q,$rootScope,jwtHelper) {
    var user = {};
    var onIdentity = function(response) {
        localStorage.setItem('id_token',response.data.jwt);
        var user = jwtHelper.decodeToken(response.data.jwt);
        $rootScope.username=user.uid;
        console.log(user);
        console.log(user.id);
        $rootScope.$emit('loginSuccess', user);
    };
    var onIdFail = function(error) {
        $rootScope.$emit('loginFail');
    };

    return {
        getUser: function() {
            var token = localStorage.getItem('id_token');
            user = jwtHelper.decodeToken(token);
            return user;
        },
        register: function(params) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST + '/register',{
                username: params.username,
                password: params.password
            })
            .then(function(response) {

                onIdentity(response);
                deferred.resolve(response);
            },function(error) {
                onIdFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        login: function(user) {
            var deferred = $q.defer();
              $http.post($rootScope.API_HOST+'/Home/Index/login', {
                username: user.username,
                password: user.password
            })
            .then(function(response) {
                $rootScope.uid=response.data.username;
                onIdentity(response);
                deferred.resolve(response);
            },function(error) {
                onIdFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        logout: function() {
            user = null;
            localStorage.removeItem('id_token');
            $rootScope.$emit('logoutSuccess');
        },
        forgetPassword: function(user) {

        },
        resetPassword: function(password) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST + '/Home/Index/reset_password',{
                new_password: password
            })
            .then(function(response) {
                onIdentity(response);
                deferred.resolve(response);
            },function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        checkLoggedIn: function() {
            var token = localStorage.getItem('id_token');
            if(angular.equals(token,null) || jwtHelper.isTokenExpired(token)) {
                return false;
            }
            return true;
        },
        checkLoggedOut: function() {
            var token = localStorage.getItem('id_token');
            if(angular.equals(token,null) || jwtHelper.isTokenExpired(token)) {
                return true;
            }
            return false;
        }
    };
}]);