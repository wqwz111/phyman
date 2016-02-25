angular.module('phyman.vote',['ngMaterial', 'ngMessages','ngMessages', 'angular-jwt', 'ui.router','ngGrid','phyman.user'])
.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('altTheme')
	    .primaryPalette('purple');
	})
.controller('votelistCtrl',['$scope', '$rootScope','$state','VoteService',
      function($scope,$rootScope,$state,VoteService){
	var promise =VoteService.getlist();
	 promise.then(function(response) {
		 $scope.vote=JSON.parse(response.data.list);
	 },function(response){
		 alert("VoteList fail");
		 $state.go("login");
	 });
	 $scope.voteDetail=function(id){
		 VoteService.setvoteid(id);
		 $state.go('/',null,{
			 reload:true
		 });
	 };
  }])

/*.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple');
})*/;  

/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/