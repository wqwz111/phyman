angular.module('phyman.noti')
.config(['$httpProvider', 'jwtInterceptorProvider', function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.urlParam = 'access_token';
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('id_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
}])
.factory('NotiService', ['$http', '$q', '$rootScope', 'jwtHelper', '$log',
    function($http, $q, $rootScope, jwtHelper, $log) {
    var noti={};
    //var notidetail={};
    var onIdentity  = function(response) {
        //Do something at backend on identity secceed.
    	 noti=response.data.list;
     }
    var onNotidetail= function(response){
    	noti.detail=response.data.notification;
    }
	var onIdFail = function(error) {
        //Do something at backend on identity failed.
    };

    return {
        /*getlistdetail: function() {
            return this.list;
        },*/
        getlist:function(id) {
            var deferred = $q.defer();
            $http.post('/PHYMAN/index.php/Home/Noti/getList', {
                username: $rootScope.username,
                access_token: $rootScope.access_token
            })
            .then(function(response) {
            	onIdentity(response);
                deferred.resolve(response);
            }, function(error) {
            	console.log(erro);
                onIdFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        setnotiid:function(id){
        	$rootScope.detailid=id;
        	$rootScope.type="Noti";
        	console.log($rootScope.notiid);
        	console.log($rootScope.type);
        }
        
  /*      getdetail: function(id) {
        	 var deferred = $q.defer();
             $http.post('/PHYMAN/index.php/Home/Noti/getNotiDetail', {
            	 username: $rootScope.username,
            	 access_token: $rootScope.access_token,
            	 id:id,//$rootScope.notiid,
             })
             .then(function(response) {
             	console.log("response");
             	console.log(response.data);
                 //onNotidetail(response);
                 deferred.resolve(response);
             }, function(error) {
                 onIdFail(error);
                 deferred.reject(error);
             });
             return deferred.promise;

        }*/       
    };
}]);