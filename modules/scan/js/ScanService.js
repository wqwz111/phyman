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
            //console.log(updated);
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
                	//console.log(erro);
                    onIdFail(error);
                    deferred.reject(error);
                });
                return deferred.promise;
        },
        deleteDetail:function(deletes,id){
            //console.log(deletes);
             var deferred = $q.defer();
                $http.post($rootScope.API_HOST+'/Home/Admin/detailscan', {
                    username: $rootScope.user.id,
                    id:id,
                    deletes:deletes
                })
                .then(function(response) {
                    onIdentity(response);
                    deferred.resolve(response);
                }, function(error) {
                    //console.log(erro);
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
               // console.log(response.data.list);
            	onIdentity(response);
                deferred.resolve(response);
            }, function(error) {
            	//console.log(erro);
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
        },
        getdiaDetail: function(id) {
             var deferred = $q.defer();
             $http.post($rootScope.API_HOST+'/Home/Admin/getScanDetail', {
                 username:id,
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
        },

    };
}])


.filter('scandetaillist',function(){
    return function(items){
        var filterItems="";
        angular.forEach(items,function(item) {
            filterItems=filterItems+items.scanname;

            });
            return filterItems;
    }
})
.filter('scanFilter',function() {
    return function(items,grade) {
        var filterItems = new Array();
        if(angular.equals(grade,'benyi')) {
            angular.forEach(items,function(item) {
                if(item.grade == "大一") {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        if(angular.equals(grade,'bener')) {
            angular.forEach(items,function(item) {
                if(item.grade == "大二") {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        if(angular.equals(grade,'bensan')) {
            angular.forEach(items,function(item) {
                if(item.grade == "大三") {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        if(angular.equals(grade,'bensi')) {
            angular.forEach(items,function(item) {
                if(item.grade == "大四") {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        if(angular.equals(grade,'yanyi')) {
            angular.forEach(items,function(item) {
                if(item.grade == "研一") {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        if(angular.equals(grade,'yaner')) {
            angular.forEach(items,function(item) {
                if(item.grade == "研二") {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        if(angular.equals(grade,'yansan')) {
            angular.forEach(items,function(item) {
                if(item.grade == "研三") {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        if(angular.equals(grade,'boshi')) {
            angular.forEach(items,function(item) {
                if(item.grade == "博士") {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        return items;
    }
});
