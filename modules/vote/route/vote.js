angular.module('phyman.vote')
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('/PHYMAN/index.php',{
        	template:'<p>hello world</p>'
    })
    .state('VoteList', {
    	url: '/PHYMAN/index.php/Home/Vote/getList',
        templateUrl: '/PHYMAN/Background/Home/phyman-1/modules/vote/views/list.html',
     })
 }]);
