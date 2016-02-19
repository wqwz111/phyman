angular.module('phyman.user')
.config(['$httpProvider', 'jwtInterceptorProvider', function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('id_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
}])
.factory('AuthService', ['$http', '$q', '$rootScope', 'jwtHelper', function($http, $q, $rootScope, jwtHelper) {

    function UserKlass() {
        this.user = {};
        this.isLoggedIn = false;
    };

    UserKlass.prototype.onIdentity = function(response) {
        //Do something at backend on identity secceed.
    };

    UserKlass.prototype.onIdFail = function(error) {
        //Do something at backend on identity failed.
    };

    UserKlass.prototype.register = function(user) {
        var deferred = $q.defer();
        $http.post('/register', {
            username: user.username,
            password: user.password
        })
        .then(function(response) {
            UserKlass.prototype.onIdentity(response);
            deferred.resolve(response);
        }, function(error) {
            UserKlass.prototype.onIdFail(error);
            deferred.reject(error);
        });
        return deferred.promise;
    };

    UserKlass.prototype.login = function(user) {
        var deferred = $q.defer();
        $http.post('/login', {
            username: user.username,
            password: user.password
        })
        .then(function(response) {
            UserKlass.prototype.onIdentity(response);
            deferred.resolve(response);
        }, function(error) {
            UserKlass.prototype.onIdFail(error);
            deferred.reject(error);
        });
        return deferred.promise;
    };

    UserKlass.prototype.logout = function(user) {
        this.user = null;
        this.isLoggedIn = false;
        $http.get('/logout').success(function() {
            localStorage.removeItem('id_token');
            $rootScope.$emit('logout');
        });
    };

    UserKlass.prototype.forgetPassword = function(user) {};

    UserKlass.prototype.resetPassword = function(user) {
        $http.post('/reset_password', {
            new_password: user.password
        })
        .then(function(response) {

        }, function(error) {

        });
    };

    UserKlass.prototype.checkLoggedIn = function() {
        var token = localStorage.getItem('id_token');
        if(angular.equals(token, null) || jwtHelper.isTokenExpired(token)) {
            return false;
        }
        return true;
    };

    UserKlass.prototype.checkLoggedOut = function() {
        var token = localStorage.getItem('id_token');
        if(angular.equals(token, null) || jwtHelper.isTokenExpired(token)) {
            return true;
        }
        return false;
    };

    var User = new UserKlass();
    return User;
}]);