angular.module('phyman.admin',['ngMaterial','ngFileUpload', 'ngMessages','ngMessages', 'angular-jwt', 'ui.router','ngGrid','phyman.user'])
.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('altTheme')
	    .primaryPalette('purple');
	})
	
	.controller('AdminCtrl',['$scope','$rootScope','$state','$mdDialog','AdminService',
        function($scope,$rootScope,$state,$mdDialog,AdminService) {
    		
     }])
     .controller('VoteResultCtrl',['$scope','$state','VoteService','$stateParams','$interval',
          function($scope,$state,VoteService,$stateParams,$interval){
    	  	var promise = VoteService.getResult($stateParams.id);
    	  		promise.then(function(response){
    	  			$scope.detail=response.data;
    	  			$scope.result=JSON.parse($scope.detail.result);
    	  		//	alert($scope.detail.options);
    	  		},function(response){
    	  			//alert("VoteResult fail");
     				$state.transitionTo(" vote.list",null,{
     					reload:true
     				});
    	  		});
     }])


.controller('AddUserCtrl',['$scope', '$rootScope','$state','AdminService','Upload', '$timeout',
      function($scope,$rootScope,$state,AdminService,Upload, $timeout){
     $scope.authorities = ('管理员 老师 学生').split(' ').map(function (authority) { return { abbrev: authority }; });
     $scope.isNewUser = false;
	 $scope.usernew = function(){
		 $scope.isNewUser = true;
         var promise = AdminService.addUser($scope.admin);
         promise.then(function(response) {
             $scope.isNewUser = false;
             if(response){
             	alert("添加用户成功");
             	$state.go("noti.list",null,{
             		reload:true
             	});
             }
             else
             	$state.go("login",null,{
             		reload:true
             	});
         }, function(response) {
         	alert('shibainiao:'+response);
             $scope.isLoggingIn = false;
         });
	 };
	 
	 
	 
	 
	  $scope.uploadFiles = function(file, errFiles) {
	        $scope.f = file;
	        $scope.errFile = errFiles && errFiles[0];
	        if (file) {
	            file.upload = Upload.upload({
	                url: '/PHYMAN/index.php/Home/Admin/impUser',
	                data: {file: file}
	            });

	            file.upload.then(function (response) {
	                $timeout(function () {
	                    file.result = response.data;
	                });
	            }, function (response) {
	                if (response.status > 0)
	                    $scope.errorMsg = response.status + ': ' + response.data;
	            }, function (evt) {
	                file.progress = Math.min(100, parseInt(100.0 * 
	                                         evt.loaded / evt.total));
	            });
	        }   
	    };
	    
	 $scope.addUserS = function(){
		 $scope.isNewUser = true;
         var promise = AdminService.newUserS($scope.admin);
         promise.then(function(response) {
             $scope.isNewUser = false;
             if(response){
             	//alert("Login成功");
             	$state.go("vote.list",null,{
             		reload:true
             	});
             }
             else
             	$state.go("login",null,{
             		reload:true
             	});
         }, function(response) {
         	alert('shibainiao:'+response);
             $scope.isLoggingIn = false;
         });
	 };
	//inject angular file upload directives and service.angular.module('myApp', ['angularFileUpload']);var MyCtrl = [ '$scope', '$upload', function($scope, $upload) {
  }]);  

/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/