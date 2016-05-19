angular.module('phyman.vote')
.factory('VoteService', ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {
    var vote={};
    //var notidetail={};
    var onIdentity  = function(response) {
        //Do something at backend on identity secceed.
    	 vote=response.data.list;
     }
	var onIdFail = function(error) {
        //Do something at backend on identity failed.
    };

    return {
        getlistdetail: function() {
            return this.list;
        },
        newVote:function(vote,options){
        	//console.log($rootScope.username);
       	    var deferred = $q.defer();
            $http.post($rootScope.API_HOST+'/Home/Admin/newVote', {
                username: $rootScope.user.id,
                title:vote.title,
                content:vote.content,
                type:vote.type,
                grades:vote.grade,
                options:options,
                date:vote.date
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
        setVote:function(item,id){
        	//console.log($rootScope.username);
           // console.log(item);
           // console.log(id);
        	 var deferred = $q.defer();
             $http.post($rootScope.API_HOST+'/Home/Vote/userVote', {
                 username:$rootScope.user.id,
                 choose:item,
                 id:id
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
        deleteVote: function(id) {
            var deferred = $q.defer();
             $http.post($rootScope.API_HOST + '/Home/Vote/deleteOne',{
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
        getList:function() {
            var deferred = $q.defer();
            $http.post($rootScope.API_HOST+'/Home/Vote/getList', {
                username: $rootScope.user.id
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
        getResult: function(id){
        	var deferred = $q.defer();
            $http.post($rootScope.API_HOST+'/Home/Vote/getVoteResult', {
                username: $rootScope.user.id,
                id:id
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
        getDetail: function(vote) {
        	 var deferred = $q.defer();
             $http.post($rootScope.API_HOST+'/Home/Vote/getVoteDetail', {
            	 username: $rootScope.user.id,
            	 id:vote
             })
             .then(function(response) {
             	//console.log("response");
             	//console.log(response.data);
                // onVotedetail(response);
                 deferred.resolve(response);
             }, function(error) {
                 onIdFail(error);
                 deferred.reject(error);
             });
             return deferred.promise;

        }       
    };
}])
.filter('votedetailFilter',function() {
	return function(input,num){
		var out=input*100/num;
		//console.log(out);
	return out;
	}
	
})
.filter('perFilter',function() {
	return function(input,num){
		var out=input*100/num;
		//console.log(out);
	return out.toFixed(2)+"%";
	}
	
})



.filter('voteFilter',function() {
    return function(items,createdTime) {
        var now = new Date();
        var month = now.getMonth() + 1;
        var thisMonth = now.getFullYear() + '-' + (month > 10 ? month : '0' + month) + '-01';
        var filterItems = new Array();
        if(angular.equals(createdTime,'new')) {
            angular.forEach(items,function(item) {
                if(item.begtime.slice(0,10) >= thisMonth) {
                    filterItems.push(item);
                }
            });
            return filterItems;
        } 
        if(angular.equals(createdTime,'old')) {
            angular.forEach(items,function(item) {
                if(item.begtime.slice(0,10) < thisMonth) {
                    filterItems.push(item);
                }
            });
            return filterItems;
        }
        return items;
    }
});