angular.module('phyman.noti', ['ui.tinymce', 'ngMessages', 'ui.router', 'ngGrid'])
    .controller('editorCtrl', ['$scope', function($scope) {
        $scope.tinymceOptions = {
            language: 'zh_CN'
        };
    }])
    .controller('notilistCtrl',['$scope','$state', '$rootScope','NotiService',
      function($scope,$state,$rootScope,NotiService){
        var promise =NotiService.getlist();
         promise.then(function(response) {
             $scope.noti=JSON.parse(response.data.list);
         },function(response){
             alert("NotiList fail");
            /* $state.transitionTo("NotiDetail",null,{
                 reload:true
             });*/
         });
         $scope.notiDetail= function(id){
             NotiService.setnotiid(id);
             $state.go('/',null,{
                 reload:true
             });
            /* $state.go('NotiDetail',null,{
                 reload:true
             });*/
             /*var promise =NotiService.getdetail(id);
             promise.then(function(response) {
                 $scope.noti.detail=JSON.parse(response.data.notification);
                 $scope.detail=JSON.parse(response.data.notification);
             },function(response){
                 alert("NotiDetail fail");
                 $state.go("login",null,{
                     reload:true
                 });
             });
             $state.go("/",null,{
                 reload:true
             });*/
            /* $state.go("NotiDetail",null,{
                 reload:true
             });
            */
             
             /*$state.go("NotiDetail",null,{
                 reload:true
             });*/
         }
      }])
    .controller('SubheaderAppCtrl',['$scope', '$rootScope', 'AuthService', 'AuthDialog','$state','NotiService',
          function($scope,$rootScope,NotiService,AuthService) {
          $list=NotiService.getjson();
          console.log($list);
          $scope.listnew=$list;//.listnew;
           $scope.listlast=$list;//.listlast;
          $scope.listearly=$list;//d.listearly;
                                }])
    /*.config(function($mdThemingProvider) {
      $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple');
    })*/;