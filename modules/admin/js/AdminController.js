angular.module('phyman.admin',['ngMaterial','ngFileUpload', 'ngMessages', 'angular-jwt', 'ui.router','ngGrid'])

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
	 
	 
	 
	  $scope.submit = function() {
          if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
          }
      };
       $scope.upload = function (file) {
            Upload.upload({
                url: $rootScope.API_HOST + '/Home/Admin/impUser',
                data: {file: file, 'username': $scope.username}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };



	  $scope.uploadFiles = function(file, errFiles) {
	        $scope.f = file;
	        $scope.errFile = errFiles && errFiles[0];
	        if (file) {
	            file.upload = Upload.upload({
	                url: $rootScope.API_HOST + '/Home/Admin/impUser',
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