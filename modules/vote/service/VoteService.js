angular.module('phyman.vote')
.config(['$httpProvider', 'jwtInterceptorProvider', function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.urlParam = 'access_token';
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('id_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
}])
.factory('VoteService', ['$http', '$q', '$rootScope', 'jwtHelper', '$log',
    function($http, $q, $rootScope, jwtHelper, $log) {
    var vote={};
    //var notidetail={};
    var onIdentity  = function(response) {
        //Do something at backend on identity secceed.
    	 noti=response.data.list;
     }
	var onIdFail = function(error) {
        //Do something at backend on identity failed.
    };

    return {
        getlistdetail: function() {
            return this.list;
        },
        setvoteid:function(id){
        	$rootScope.detailid=id;
        	$rootScope.type="Vote";
        },
        getlist:function() {
            var deferred = $q.defer();
            $http.post('/PHYMAN/index.php/Home/Vote/getList', {
                username: $rootScope.username,
                access_token: $rootScope.access_token
            })
            .then(function(response) {
            	//$rootScope.list=response.data.list;
            	onIdentity(response);
                deferred.resolve(response);
            }, function(error) {
            	console.log(erro);
                onIdFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        
        getdetail: function(noti) {
        	 var deferred = $q.defer();
             $http.post('/PHYMAN/index.php/Home/Vote/getVoteDetail', {
            	 username: $rootScope.username,
            	 access_token: $rootScope.access_token,
            	 noti:noti
             })
             .then(function(response) {
             	console.log("response");
             	console.log(response.data);
                 onNotidetail(response);
                 deferred.resolve(response);
             }, function(error) {
                 onIdFail(error);
                 deferred.reject(error);
             });
             return deferred.promise;

        }       
    };
}]);