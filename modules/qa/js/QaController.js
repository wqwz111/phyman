angular.module('phyman.qa',[])
.controller('QaCtrl',['$scope','$rootScope','$state','$mdDialog','QaService','qa',
        function($scope,$rootScope,$state,$mdDialog,QaService,qa) {
    		var promise = QaService.getList();
   	 			promise.then(function(response) {
   	 				//alert(response.data);
   	 				$scope.qa=JSON.parse(response.data.list);
   	 			},function(response){
   	 			//	alert("QaList fail");
   	 				
   	 			});
        	
        	$scope.newQ = function() {
        		$state.go('^.newQ');
        	};
        	$scope.newA = function(id){
              //  console.log($rootScope.user);
        		if($rootScope.user.permission=="admin"){
             //       console.log($rootScope.user.permission);
        			$state.go('^.newA',{
        				id: id
        				},{
        					reload:true
        			});
                }

        	}
        	
        	$scope.markNoti = function(id) {
        		
            };
            $scope.deleteQa = function(id,ev,index) {
            $mdDialog.show($mdDialog.confirm()
                .title('是否要删除该问答？')
                .textContent('删除后将不可恢复。')
                .targetEvent(ev)
                .ok('删除!')
                .cancel('点错了')).then(function() {
                    QaService.deleteQa(id)
                      .then(function(response) {
                        //do something when succeed.
                        $scope.qa.splice(index,1);
                    },function(error) {
                        //do something when failed
                    });
                },function() {});
        };

     }])
     .controller('QuestionCtrl',['$scope', '$rootScope','$state','QaService',
         function($scope,$rootScope,$state,QaService){
    	 $scope.isNewQ = false;
    	 $scope.qanew = function(){
    		 $scope.isNewQ = true;
    		 var promise = QaService.newQ($scope.qa);
    		 promise.then(function(response) {
    			 $scope.isNewQ = false;
    			 if(response){
    				 //alert("Login成功");
    				 $state.go("qa.list",null,{
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
    	}])  
	.controller('AnswerCtrl',['$scope', '$rootScope','$stateParams','$state','QaService',
          function($scope,$rootScope,$stateParams,$state,QaService){
		  
          $scope.isNewA = false;
          $scope.qanew = function(){
        	  $scope.isNewA = true;
        	  var promise = QaService.newA($scope.qa,$stateParams.id);
        	  promise.then(function(response) {
        		  $scope.isNewA = false;
        		  if(response){
        			  //alert("Login成功");
        			  $state.go("qa.list",null,{
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
	}]);

	
