angular.module('phyman.qa')
.config(['$httpProvider', 'jwtInterceptorProvider', function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.urlParam = 'access_token';
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('id_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
}])
.factory('QaService', ['$http', '$q', '$rootScope', 'jwtHelper', '$log',
    function($http, $q, $rootScope, jwtHelper, $log) {
    var qa={};
    var qaId;
	var onIdFail = function(error) {
        //Do something at backend on identity failed.
    };
    return {
        getList:function(id) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST+'/Home/Qa/getList', {
                username: $rootScope.user.id,
                access_token: $rootScope.access_token
            })
            .then(function(response) {
            	console.log("QAgetlist");
            	console.log(response.data.list);
                deferred.resolve(response);
            }, function(error) {
            	console.log(erro);
                onIdFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        newQ:function(qa){
          	 var deferred = $q.defer();
               $http.post($rootScope.API_HOST+'/Home/Qa/newQuestion', {
                   username:$rootScope.user.id,// $rootScope.username,
                   question: qa.question
               })
               .then(function(response) {
               //	onIdentity(response);
                   deferred.resolve(response);
               }, function(error) {
               	console.log(erro);
                   onIdFail(error);
                   deferred.reject(error);
               });
               return deferred.promise;
           },
        newA: function(qa,id) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST+'/Home/Qa/newAnswer',{
            	username: $rootScope.user.id,//$rootScope.username,
            	id:id,
                answer: qa.answer
            })
            .then(function(response) {
                deferred.resolve(response);
            }),function(error) {
                onFail(error);
                deferred.reject(error);
            };
            return deferred.promise;
        }
    };
}])
.filter('qaFilter',function() {
    return function(items,createdTime) {
        var now = new Date();
        var month = now.getMonth() + 1;
        var thisMonth = now.getFullYear() + '-' + (month > 10 ? month : '0' + month) + '-01';
        var filterItems = new Array();
        if(angular.equals(createdTime,'new')) {
            angular.forEach(items,function(item) {
                if(item.qdate.slice(0,10) >= thisMonth) {
                    filterItems.push(item);
                }
            });
            return filterItems;
        } 
        if(angular.equals(createdTime,'old')) {
            angular.forEach(items,function(item) {
                if(item.qdate.slice(0,10) < thisMonth) {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        return items;
    }
});
  
