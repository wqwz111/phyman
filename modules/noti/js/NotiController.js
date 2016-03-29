angular.module('phyman.noti',['ui.tinymce','ngMessages','ui.router','ngMaterial'])
    .controller('NotiEditorCtrl',['$scope','$state','NotiService',
      function($scope,$state,NotiService) {
        $scope.tinymceOptions = {
            language: 'zh_CN',
            plugins: 'fullscreen,preview,table',
            toolbar: 'undo,redo,bold,italic,styleselect,fontsizeselect,removeformat,'+
                'bullist,numlist,outdent,indent,table,preview,fullscreen',
            trusted: true,
            menubar: false,
            statusbar: false,
            min_height:400,
            max_width:900
        };
        $scope.noti = {};
        $scope.submit = function() {
            NotiService.addNoti($scope.noti)
              .then(function(response) {
                $state.go('^.list',null,{reload:true});
            },function(error) {

            });
        };
    }])
    .controller('NotiCtrl',['$scope','$rootScope','$state','$mdDialog','NotiService',
      'noti_list',function($scope,$rootScope,$state,$mdDialog,NotiService,noti_list) {
        $scope.noti = noti_list.data;
        $scope.viewNoti = function(id) {
            NotiService.setNotiid(id);
            $state.go('^.detail',
            {
                id: id
            },{
                reload:true
            });
        };
        $scope.newNoti = function() {
            $state.go('^.new');
        };
        $scope.deleteNoti = function(id,ev,index) {
            $mdDialog.show($mdDialog.confirm()
                .title('是否要删除该通知？')
                .textContent('该通知删除后将不可恢复。')
                .targetEvent(ev)
                .ok('删除!')
                .cancel('点错了')).then(function() {
                    NotiService.deleteNoti(id)
                      .then(function(response) {
                        //do something when succeed.
                        $scope.noti.splice(index,1);
                    },function(error) {
                        //do something when failed
                    });
                },function() {});
        };
    }])
    .controller('NotiViewCtrl',['$scope','$state','$stateParams','$sce','NotiService',
      'noti',function($scope,$state,$stateParams,$sce,noti,NotiService) {
        $scope.noti = noti.data;
        $scope.viewStat = function(id) {
            NotiService.viewStat(id)
              .then(function(response) {
                $scope.stat.vStds = response.data;
              },function(error) {

              });
        };
    }]);