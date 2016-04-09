angular.module('phyman.noti')
.factory('NotiService',['$http','$q','$rootScope',
    function($http,$q,$rootScope) {
    var noti={};
    var notiId;
    var onFail = function(error) {
        //Do something at backend on failed.
    };

    return {
        getList:function(id) {
            var deferred = $q.defer();
            $http.get($rootScope.API_HOST + '/noti/list')
            .then(function(response) {
                noti = response.data;
                deferred.resolve(response);
            },function(error) {
                onFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        setNotiid:function(id){
            notiId = id;
        },
        getDetail: function(id) {
             var deferred = $q.defer();
             $http.get($rootScope.API_HOST + '/noti/findOne',{
                params:{
                    id: id
                }
             })
             .then(function(response) {
                 noti.detail=response.data;
                 deferred.resolve(response);
             },function(error) {
                 onFail(error);
                 deferred.reject(error);
             });
             return deferred.promise;
        },
        addNoti: function(noti) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST + '/noti/add',{
                noti: noti
            })
            .then(function(response) {
                deferred.resolve(response);
            }),function(error) {
                onFail(error);
                deferred.reject(error);
            };
            return deferred.promise;
        },
        deleteNoti: function(id) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST + '/noti/deleteOne',{
                id:id
            })
            .then(function(response) {
                deferred.resolve(response);
            },function(error) {
                onFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        viewStat: function(id) {
            var deferred = $q.defer();
            $http.get($rootScope.API_HOST + '/noti/stat',{
                id:id
            })
            .then(function(response) {
                deferred.resolve(response);
            },function(error) {
                onFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
}])
.filter('notiFilter',function() {
    return function(items,createdTime) {
        var now = new Date();
        var month = now.getMonth() + 1;
        var thisMonth = now.getFullYear() + '-' + (month > 10 ? month : '0' + month) + '-01';
        var filterItems = new Array();
        if(angular.equals(createdTime,'new')) {
            angular.forEach(items,function(item) {
                if(item.date.slice(0,10) >= thisMonth) {
                    filterItems.push(item);
                }
            });
            return filterItems;
        } 
        if(angular.equals(createdTime,'old')) {
            angular.forEach(items,function(item) {
                if(item.date.slice(0,10) < thisMonth) {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        return items;
    }
})
.filter('trustedHtml',['$sce',function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);