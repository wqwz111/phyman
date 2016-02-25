angular.module('phyman.noti')
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('/PHYMAN/index.php',{
        	template:'<p>hello world</p>'
    })
    .state('NotiList', {
    	url: '/PHYMAN/index.php/Home/Noti/getList',
   	    //templateUrl:'./Background/Home/phyman-1/modules/noti/views/notidetail.html',

        templateUrl: './Background/Home/phyman-1/modules/noti/views/list.html',
     })
 }]);