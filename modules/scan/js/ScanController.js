angular.module('phyman.scan',['ngMaterial'])
    .controller('ScanCtrl',['$scope','$rootScope','$state','ScanService',
        function($scope,$rootScope,$state,ScanService) {
            var promise =ScanService.getDetail();
                promise.then(function(response) {
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
            $scope.ifAdmin=false;
            $scope.permission=$rootScope.user.permission;
            if($scope.permission.indexOf('admin')!=-1)
                    $scope.ifAdmin=true;

            console.log("permission"+ $scope.permission);

     }])
    .controller('DetailCtrl',['$scope',  '$rootScope','$state','ScanService','$mdDialog','$mdMedia',
          function($scope, $rootScope,$state,ScanService,$mdDialog,$mdMedia){
            $scope.states = ('大一 大二 大三 大四 研一 研二 研三 博士').split(' ').map(function (state) { return { abbrev: state }; });
            $scope.scan=[];


            $scope.scan.scans=[];
            $scope.scan.grade="";

            var promise =ScanService.getList();
            promise.then(function(response) {
                $scope.scan.list=$scope.scan=JSON.parse(response.data.list);
            },function(response){
                alert("ScanList fail");
                $state.go("login");
            });
            var tmpl = "<md-dialog >\n"+
                    "<md-dialog-content >\n"+
                    "<h1 class=\"md-title\">活动条目</h1>\n"+
                    "<ui ng-repeat=\"item in scans\">\n"+
                    "<li>\n"+
                    "<md-checkbox aria-label=\"item\" ng-checked=\"exists(item, deletelist)\" ng-click=\"toggle(item, deletelist)\"></md-checkbox>\n"+
                    "{{item.scanname}}</li>\n"+
                    "</ui>\n"+

                    "<md-button aria-label=\"menu\"  align=\"center\" valign=\"middle\" ng-click=\"delete($event)\">\n"+
                        "<md-icon md-svg-src=\"assets/images/ic_edit_24px.svg\"></md-icon>\n"+
                    "</md-button>\n"+
                    "<md-button aria-label=\"menu\"  align=\"center\" valign=\"middle\" ng-click=\"close()\">\n"+
                        "<md-icon md-svg-src=\"assets/images/ic_healing_24px.svg\"></md-icon>\n"+
                    "</md-button>\n"+
                "</md-dialog-content>\n"+
              "</md-dialog>\n";

            $scope.openDialog = function (event,id) {

                $mdDialog.show({
                    locals:{dataToPass: id},
                    template: tmpl,

                    controller: DialogCtrl,
                    targetEvent: event,
                    clickOutsideToClose: true,
                });
            };
            var DialogCtrl = function($scope, dataToPass,$mdDialog) {
                //console.log(dataToPass);
                $scope.scans=[];
                $scope.deletelist=[];
                var promise =ScanService.getdiaDetail(dataToPass);
                        promise.then(function(response) {
                        $scope.scans=JSON.parse(response.data.scans);
                    },function(response){
                        alert("detail fail");
                        $state.go("login");
                    });
                $scope.close = function() {
                    $mdDialog.cancel();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.toggle = function (item,list){
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
                $scope.exists = function (item,list){
                    return list.indexOf(item) > -1;
                };
                $scope.delete=function(ev){
                    //console.log($scope.deletelist);
                    $mdDialog.show($mdDialog.confirm()
                        .title('是否要删除所选条目？')
                        .textContent('删除后将不可恢复。')
                        .targetEvent(ev)
                        .ok('删除!')
                        .cancel('点错了')).then(function() {
                            ScanService.deleteDetail($scope.deletelist,dataToPass)
                              .then(function(response) {
                                $mdDialog.cancel();
                            },function(error) {

                                $mdDialog.cancel();
                                //do something when failed
                            });
                        },function() {});
                };
            };
      }])
    .controller('updateCtrl',['$scope',  '$rootScope','$state','ScanService','$mdDialog','$mdMedia',
          function($scope, $rootScope,$state,ScanService,$mdDialog,$mdMedia){
            $scope.states = ('大一 大二 大三 大四 研一 研二 研三 博士').split(' ').map(function (state) { return { abbrev: state }; });
            $scope.scan=[];
            $scope.scan.scans=[];
            $scope.scan.grade="";
            var promise =ScanService.getList();
            promise.then(function(response) {
                $scope.scan.list=$scope.scan=JSON.parse(response.data.list);
            },function(response){
                alert("ScanList fail");
                $state.go("login");
            });
            $scope.title="";
            $scope.updated = [];
            $scope.showdialog=false;

            var tmpl = "<md-dialog >\n"+
                    "<md-dialog-content >\n"+
                    "<h1 class=\"md-title\">活动条目</h1>\n"+
                    "<ui ng-repeat=\"item in scans\">\n"+
                    "<li>\n"+
                    "<md-checkbox aria-label=\"item\" ng-checked=\"exists(item, deletelist)\" ng-click=\"toggle(item, deletelist)\"></md-checkbox>\n"+
                    "{{item.scanname}}</li>\n"+
                    "</ui>\n"+

                    "<md-button aria-label=\"menu\"  align=\"center\" valign=\"middle\" ng-click=\"delete($event)\">\n"+
                        "<md-icon md-svg-src=\"assets/images/ic_edit_24px.svg\"></md-icon>\n"+
                    "</md-button>\n"+
                    "<md-button aria-label=\"menu\"  align=\"center\" valign=\"middle\" ng-click=\"close()\">\n"+
                        "<md-icon md-svg-src=\"assets/images/ic_healing_24px.svg\"></md-icon>\n"+
                    "</md-button>\n"+
                "</md-dialog-content>\n"+
              "</md-dialog>\n";

            $scope.openDialog = function (event,id) {

                $mdDialog.show({
                    locals:{dataToPass: id},
                    template: tmpl,

                    controller: DialogCtrl,
                    targetEvent: event,
                    clickOutsideToClose: true,
                });
            };
            var DialogCtrl = function($scope, dataToPass,$mdDialog) {
                //console.log(dataToPass);
                $scope.scans=[];
                $scope.deletelist=[];
                var promise =ScanService.getdiaDetail(dataToPass);
                        promise.then(function(response) {
                        $scope.scans=JSON.parse(response.data.scans);
                    },function(response){
                        alert("detail fail");
                        $state.go("login");
                    });
                $scope.close = function() {
                    $mdDialog.cancel();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.toggle = function (item,list){
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
                $scope.exists = function (item,list){
                    return list.indexOf(item) > -1;
                };
                $scope.delete=function(ev){
                    //console.log($scope.deletelist);
                    $mdDialog.show($mdDialog.confirm()
                        .title('是否要删除所选条目？')
                        .textContent('删除后将不可恢复。')
                        .targetEvent(ev)
                        .ok('删除!')
                        .cancel('点错了')).then(function() {
                            ScanService.deleteDetail($scope.deletelist,dataToPass)
                              .then(function(response) {
                                $mdDialog.cancel();
                            },function(error) {

                                $mdDialog.cancel();
                                //do something when failed
                            });
                        },function() {});
                };
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
            $scope.update=function(){
                var promise =ScanService.update($scope.updated,$scope.title);
                $state.go('scan.detail',null,{
                    reload:true
                });
            };
      }]);

