angular.module('phyman.scan')
.factory('ScanService', ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {
    var scan={};
    //var notidetail={};
    var onIdentity  = function(response) {
    	 scan=response.data.list;
     }
	var onIdFail = function(error) {
    };

    return {
       
        update:function(updated,title){
            console.log(updated);
        	 var deferred = $q.defer();
                $http.post($rootScope.API_HOST+'/Home/Admin/updatescan', {
                    username: $rootScope.user.id,
                    title:title,
                    updated:updated
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
        
        getList:function() {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST+'/Home/Admin/getScanList', {
                username: $rootScope.user.id,
            })
            .then(function(response) {
            	//$rootScope.list=response.data.list;
                console.log(response.data.list);
            	onIdentity(response);
                deferred.resolve(response);
            }, function(error) {
            	console.log(erro);
                onIdFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        
        getDetail: function() {
        	 var deferred = $q.defer();
             $http.post($rootScope.API_HOST+'/Home/Admin/getScanDetail', {
            	 username:$rootScope.user.id,
             })
             .then(function(response) {
             	//console.log("response");
             	//console.log(response.data);
                 deferred.resolve(response);
             }, function(error) {
                 onIdFail(error);
                 deferred.reject(error);
             });
             return deferred.promise;
        }       
    };
}]);
