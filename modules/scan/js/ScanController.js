angular.module('phyman.scan',['ngMaterial', 'ngMessages','ngMessages','angular-jwt', 'ui.router','ngGrid'])

	.controller('ScanCtrl',['$scope','$rootScope','$state','$mdDialog','ScanService',
        function($scope,$rootScope,$state,$mdDialog,ScanService) {
    		var promise =ScanService.getDetail();
   	 			promise.then(function(response) {
   	 				//alert(response.data.list);
   	 				$scope.detail=response.data;
            $scope.scans=JSON.parse(response.data.scans);
   	 			},function(response){
   	 				
   	 				$state.transitionTo("scan.detail",null,{
   	 					reload:true
   	 				});
   	 			});
        	
        	$scope.newScan = function(id) {
        		$state.go('^.update');
        	};
     }])
     
    .controller('updateCtrl',['$scope', '$rootScope','$state','ScanService',
          function($scope,$rootScope,$state,ScanService){
          	var promise =ScanService.getList();
            	 promise.then(function(response) {
            		  $scope.scan=JSON.parse(response.data.list);
            	  },function(response){
            	 	  alert("ScanList fail");
             		  $state.go("login");
            	  });
                $scope.title="";
                $scope.updated = [];
                $scope.toggle = function (item, list) {
                   var idx = list.indexOf(item);
                   if (idx > -1) {
                       list.splice(idx, 1);
                       $scope.selnum-=1;
                   }
                   else {
                       list.push(item);
                       $scope.selnum+=1;
                   }
                 };
                 $scope.exists = function (item, list) {
                   return list.indexOf(item) > -1;
                 };
              	 $scope.update=function(){
                  
              		 var promise =ScanService.update($scope.updated,$scope.title);
              		 $state.go('scan.detail',null,{
              			 reload:true
              		 });
              	 };
      }]);
