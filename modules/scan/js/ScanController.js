angular.module('phyman.scan',[])
	.controller('ScanCtrl',['$scope','$rootScope','$state','ScanService',
        function($scope,$rootScope,$state,ScanService) {
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
            $scope.states = ('大一 大二 大三 大四 研一 研二 研三 博士').split(' ').map(function (state) { return { abbrev: state }; });
            $scope.scan=[];
            $scope.scan.grade="";
            /*
              $scope.scan.benyi=false;
              $scope.scan.bener=false;
              $scope.scan.bensan=false;
              $scope.scan.bensi=false;
              $scope.scan.yanyi=false;
              $scope.scan.yaner=false;
              $scope.scan.yansan=false;
              $scope.scan.boshi=false;
*/




          /*  if($scope.scan.grade=="大一"){
              $scope.scan.benyi=true;

            }else if($scope.scan.grade=="大二"){
              $scope.scan.bener=true;

            }else if($scope.scan.grade=="大三"){
              $scope.scan.bensan=true;

            }else if($scope.scan.grade=="大四"){
              $scope.scan.bensi=true;

            }else if($scope.scan.grade=="研一"){
              $scope.scan.yanyi=true;

            }else if($scope.scan.grade=="研二"){
              $scope.scan.yaner=true;

            }else if($scope.scan.grade=="研三"){
              $scope.scan.yansan=true;

            }
            else if($scope.scan.grade=="博士"){
              $scope.scan.boshi=true;

            }*/


          	var promise =ScanService.getList();
            	 promise.then(function(response) {
            		  //$scope.scan=JSON.parse(response.data.list);
                  $scope.scan.list=$scope.scan=JSON.parse(response.data.list);
                  /*$scope.scan.benyi=JSON.parse(response.data.benyi);
                  $scope.scan.bener=JSON.parse(response.data.bener);
                  $scope.scan.bensan=JSON.parse(response.data.bensan);
                  $scope.scan.bensi=JSON.parse(response.data.bensi);
                  $scope.scan.yanyi=JSON.parse(response.data.yanyi);
                  $scope.scan.yaner=JSON.parse(response.data.yaner);
                  $scope.scan.yansan=JSON.parse(response.data.yansan);
                  $scope.scan.boshi=JSON.parse(response.data.boshi);*/

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
