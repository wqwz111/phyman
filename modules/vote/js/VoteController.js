angular.module('phyman.vote',[])
.controller('VoteCtrl',['$scope','$rootScope','$state','$mdDialog','VoteService',
    function($scope,$rootScope,$state,$mdDialog,VoteService) {
        var promise =VoteService.getList();
                promise.then(function(response) {
                    $scope.vote=JSON.parse(response.data.list);
                },function(response){
                    $state.transitionTo("VoteDetail",null,{
                        reload:true
                    });
                });
        $scope.viewVote = function(id) {
            $state.go('^.detail',{
                    id: id
                    },{
                        reload:true
                });
        };
        $scope.newVote = function(id) {
            $state.go('^.new');
        };
        $scope.markVote = function(id) {
        };
        $scope.deleteVote = function(id,ev,index) {
        $mdDialog.show($mdDialog.confirm()
                .title('是否要删除该通知？')
                .textContent('该通知删除后将不可恢复。')
                .targetEvent(ev)
                .ok('删除!')
                .cancel('点错了')).then(function() {
                    VoteService.deleteVote(id)
                    .then(function(response) {
                        //do something when succeed.
                        $scope.vote.splice(index,1);
                    },function(error) {
                        //do something when failed
                    });
                    },function() {});
        };
 }])
 .controller('VoteResultCtrl',['$scope','$state','VoteService','$stateParams','$interval',
      function($scope,$state,VoteService,$stateParams,$interval){
        var promise = VoteService.getResult($stateParams.id);
            promise.then(function(response){
                $scope.detail=response.data;
                $scope.result=JSON.parse($scope.detail.result);
            //  alert($scope.detail.options);
            },function(response){
                //alert("VoteResult fail");
                $state.transitionTo(" vote.list",null,{
                    reload:true
                });
            });
 }])
 .controller('VoteViewCtrl',['$scope','$state','$http','$stateParams','VoteService',
  function($scope,$state,$http,$stateParams,VoteService) {
     var promise =VoteService.getDetail($stateParams.id);
            promise.then(function(response) {
            if(response.data.choose==1){
              //  console.log(response.data.choose);
                $state.go('^.result',
                        {
                            id: $stateParams.id
                        },{
                            reload:true
                        });

            }
            $scope.detail=response.data;
            $scope.items=JSON.parse(response.data.options);
            $scope.ifsingle=response.data.type;
            },function(response){
                $state.transitionTo(" VoteDetail",null,{
                    reload:true
                });
            });
            $scope.selnum=0;
            $scope.selected = [];
            $scope.votenow = function(){
            //console.log($scope.selected);
                if($scope.ifsingle==0&& $scope.selnum!=1 )
                    alert("当前为单选，请选择一个选项");
                else{
                var promise =VoteService.setVote($scope.selected,$stateParams.id);
                $id=$stateParams.id;
                $state.go('^.result',
                        {
                            id: $id
                        },{
                            reload:true
                        });
                }
            };

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
 }])  
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
         $state.go('VoteList',null,{
             reload:true
         });
     };
  }])
.controller('VoteEditorCtrl',['$scope', '$rootScope','$state','VoteService',
      function($scope,$rootScope,$state,VoteService){
         $scope.vote={};
         $scope.vote.date=new Date();
         $scope.minDate = new Date();
         $scope.userState = '';
         $scope.states = ('单选 多选').split(' ').map(function (state) { return { abbrev: state }; });

         $scope.grades = ('大一 大二 大三 大四 研一 研二 研三 博士 毕业生').split(' ').map(function (grade) { return { abbrev: grade }; });
         $scope.selnum1=0;
         $scope.gradesel=[];
         $scope.toggle1 = function (item, list) {
               var idx = list.indexOf(item);
               if (idx > -1) {
                   list.splice(idx, 1);
                   $scope.selnum1-=1;
               }
               else {
                   list.push(item);
                   $scope.selnum1+=1;
               }
             };

         $scope.options=[{
            optid:1,
            optcontent:""
         }];
         $scope.addOption = function(){
            if($scope.options.length <= 10) {
                $scope.options.push({
                    optid:$scope.options.length + 1,
                    optcontent:""
                });
            }
         }
         $scope.deleteOption = function(){
            if($scope.options.length > 1) {
                $scope.options.pop();
            }
         }

         $scope.numbers = ('一 二 三 四 五 六 七 八 九 十').split(' ').map(function (number){return {abbrev:number};});
         $scope.isNewVote = false;
         $scope.votenew = function(){
             $scope.isNewVote = true;
             var options="";
             for(var i=0;i<$scope.options.length;i++){
                    if(!$scope.options[i]['optcontent']==""){
                        options=options+$scope.options[i]['optcontent']+";";  
                 } 
             }
             if($scope.selnum1<=0){
                alert("至少选择一个年级");
             }else if($scope.vote.type==null){
                alert("请选择单选或多选");
             }else{
                var promise = VoteService.newVote($scope.vote,options);
                 promise.then(function(response) {
                     $scope.isNewVote = false;
                     if(response){
                       
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
             }
         };
    
  }]);  

/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/