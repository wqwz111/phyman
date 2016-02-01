angular.module('phyman.user')
.config(['$httpProvider', 'jwtInterceptorProvider', function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('id_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
}])
.factory('AuthService', ['$http', '$rootScope', 'jwtHelper', function($http, $rootScope, jwtHelper) {

    function UserKlass() {
        this.user = {};
        this.isLoggedInError = false;
        this.isRegisteredErroe = false;
    };

    UserKlass.prototype.onIdentity = function(response) {};

    UserKlass.prototype.onIdFail = function(response) {};

    UserKlass.prototype.register = function(user) {
        $http.post('/register', {
            username: user.username,
            password: user.password
        })
        .success(this.onIdentity.bind(this))
        .error(this.onIdFail.bind(this));
    };

    UserKlass.prototype.login = function(user) {
        $http.post('/login', {
            username: user.username,
            password: user.password
        })
        .success(this.onIdentity.bind(this))
        .error(this.onIdFail.bind(this));
    };

    UserKlass.prototype.logout = function(user) {
        this.username = null;
        this.email = null;
        this.stdNo = null;
        this.isLoggedIn = false;
        this.level = 0;
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
        .success(this.onIdentity.bind(this))
        .error(this.onIdFail.bind(this));
    };

    UserKlass.prototype.checkLoggedIn = function() {
        var token = localStorage.getItem('id_token');
        if(token === null || jwtHelper.isTokenExpired(token)) {
            return false;
        }
        return true;
    };

    UserKlass.prototype.checkLoggedOut = function() {
        var token = localStorage.getItem('id_token');
        if(token === null || jwtHelper.isTokenExpired(token)) {
            return true;
        }
        return false;
    };

    var User = new UserKlass();
    return User;
}]);