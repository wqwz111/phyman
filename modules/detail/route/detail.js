angular.module('phyman.detail')
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('/PHYMAN/index.php',{
        	template:'<p>hello world</p>'
    })
     .state('NotiDetail',{
    	 url: '/PHYMAN/index.php/Home/Noti/getNotiDetail',
    	// template:'<p>hello world</p>'
    	 templateUrl:'./Background/Home/phyman-1/modules/detail/views/notidetail.html',
     })
      .state('VoteDetail',{
    	 url: '/PHYMAN/index.php/Home/Vote/getVoteDetail',
    	// template:'<p>hello world</p>'
    	 templateUrl:'./Background/Home/phyman-1/modules/detail/views/votedetail.html',
     })
 }]);