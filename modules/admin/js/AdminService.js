angular.module('phyman.admin')
.factory('AdminService', ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {
    var admin={};
    var adminId;
    //var notidetail={};
   /* var onIdentity  = function(response) {
        //Do something at backend on identity secceed.
    	 noti=response.data.list;
     }
    var onNotidetail= function(response){
    	noti.detail=response.data.notification;
    }*/
	var onIdFail = function(error) {
        //Do something at backend on identity failed.
    };

    return {
       /* filepost:function (file, data, callback) {
      
            $http({
                url: $rootScope.API_HOST + '/Home/Admin/impUser',
                method: "POST",
                data: data,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                callback(response);
            });
        },*/
        /*getlistdetail: function() {
            return this.list;
        },*/
        getList:function(id) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST + '/Home/Noti/getList', {
                username: $rootScope.user.id
            })
            .then(function(response) {
                //console.log("getlist");
            //	console.log(response.data.list);
                deferred.resolve(response);
            }, function(error) {
            	//console.log(erro);
                onIdFail(error);
                deferred.reject(error);
            });
            return deferred.promise;
        },
        setNotiid:function(id){
        	notiId=id;
        /*	$rootScope.detailid=id;
        	$rootScope.type="Noti";
        	console.log($rootScope.notiid);
        	console.log($rootScope.type);*/
        },
        
        addUser: function(admin) {
        	 var deferred = $q.defer();
             $http.post($rootScope.API_HOST + '/Home/Admin/addUser', {
            	 username: $rootScope.user.id,
            	 id:admin.id,//$rootScope.notiid,
            	 name:admin.name,
            	 mailbox:admin.mailbox,
            	 authority:admin.authority,
            	 grade:admin.grade
             })
             .then(function(response) {
             	//console.log("response");
             	//console.log(response.data);
             	//noti.detail=response.data.notification;
                 //onNotidetail(response);
                 deferred.resolve(response);
             }, function(error) {
                 onIdFail(error);
                 deferred.reject(error);
             });
             return deferred.promise;

        },
        updateNoti: function(noti) {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST + '/Home/Admin/newNoti',{
            	username: $rootScope.user.id,
                title: noti.title,
                body:noti.content
                
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
            $http.post($rootScope.API_HOST + '/Home/Noti/deleteNoti',{
                id:id
            })
            .then(function(response) {

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
});
  
