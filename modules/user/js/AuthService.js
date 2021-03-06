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
        var user = JSON.parse(jwtHelper.decodeToken(response.data.jwt));
        $rootScope.username=user.id;
        $rootScope.$emit('loginSuccess', user);
    };
    var onIdFail = function(error) {
        $rootScope.$emit('loginFail');
    };

    return {
        getUser: function() {
            var token = localStorage.getItem('id_token');
            user = JSON.parse(jwtHelper.decodeToken(token));
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
                if(response.data.log==0){
                    onIdentity(response);
                }else if(response.data.log==1){
                    alert("密码错误，请重新登录");
                }else if(response.data.log==2){
                    alert("该账号未注册");
                }
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
            var deferred = $q.defer();
            
            $http.post($rootScope.API_HOST + '/Home/Index/forget_password',{
               
                username:user.username
            })
            .then(function(response) {
               alert(response.data.log);
               deferred.resolve(response);
            },function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        resetPassword: function(password) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST + '/Home/Index/reset_password',{
                new_password: password,
                username:$rootScope.user.id
            })
            .then(function(response) {
               
                deferred.resolve(response);
            },function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        resetEmail: function(email) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST + '/Home/Admin/reset_email',{
                new_email: email,
                username:$rootScope.user.id
            })
            .then(function(response) {
               
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