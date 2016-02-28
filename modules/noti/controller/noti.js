angular.module('phyman.noti',['ui.tinymce','ngMessages','ui.router','ngMaterial'])
    .controller('NotiEditorCtrl',['$scope','$state','NotiService',
      function($scope,$state,NotiService) {
        $scope.tinymceOptions = {
            language: 'zh_CN',
            plugins: 'fullscreen,preview,table',
            toolbar: 'undo,redo,bold,italic,styleselect,fontsizeselect,removeformat,'+
                'bullist,numlist,outdent,indent,table,preview,fullscreen',
            menubar: false,
            statusbar: false,
            min_height:400,
            max_width:900
        };
        $scope.submit = function() {
            var notiNewer = {};
            notiNewer.title = $scope.noti.title;
            notiNewer.content = $scope.noti.content;
            NotiService.updateNoti(notiNewer)
              .then(function(response) {
                $state.go('noti.list');
            },function(error) {

            });
        };
    }])
    .controller('NotiCtrl',['$scope','$rootScope','$state','$mdDialog','NotiService',
      'noti',function($scope,$rootScope,$state,$mdDialog,NotiService,noti) {
        $scope.noti = noti.data;
        $scope.viewNoti = function(id) {
            NotiService.setNotiid(id);
            $state.go('^.detail',
            {
                noti_id: id
            },{
                reload:true
            });
        };
        $scope.newNoti = function() {
            $state.go('^.new');
        };
        $scope.editNoti = function(id) {
            $state.go('^.edit',
            {
                noti_id: id
            },{
                reload:true
            });
        };
        $scope.markNoti = function(id) {

        };
        $scope.deleteNoti = function(id,ev) {
            $mdDialog.show($mdDialog.confirm()
                .title('是否要删除该通知？')
                .textContent('该通知删除后将不可恢复。')
                .targetEvent(ev)
                .ok('删除!')
                .cancel('点错了')).then(function() {
                    NotiService.deleteNoti(id)
                      .then(function(response) {
                        //do something when succeed.
                    },function(error) {
                        //do something when failed
                    });
                },function() {});
        };
    }])
    .controller('NotiViewCtrl',['$scope','$state','$stateParams',
      'NotiService',function($scope,$state,$stateParams,NotiService) {
        $scope.content = NotiService.getDetail($stateParams.noti_id);
    }]);