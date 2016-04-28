angular.module('phyman.message',['ngMaterial'])
  .controller('messageCtrl',['$scope','$state','MsgService',
    function($scope,$state,MsgService){
    $scope.showNotice = false;
    MsgService.getUnreadMsg()
     .then(function(response) {
        $scope.notice = response.data;
        $scope.showNotice = true;
     }).then(function(error) {
        $scope.notice = {};
        $scope.showNotice = false;
     });
    MsgService.on('connect',function(data) {
        MsgService.emit('login',$rootScope.user.id,$rootScope.user.viewlevel);
    });
    MsgService.on('new_msg',function(data) {
        // Message is a json object.
        // {
        //   from: '',
        //   to: '',
        //   content: '',
        //   viewlevel: '',
        //   action: ''
        // }
        $scope.notice = response.data;
    });
    $scope.onClick = function(index) {
        $state.go($scope.notice.action);
    }
  }])
  .factory('MsgService',['$rootScope','$http','$q',function($rootScope,$http,$q){
    var SOCKET_HOST = 'http://localhost:2120';
    var socket = io.connect(SOCKET_HOST);
    return {
        on: function(eventName,callback) {
            socket.on(eventName,function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket,args);
                });
            });
        },
        emit: function(eventName,callback) {
            socket.emit(eventName,data,function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket,args);
                    }
                });
            });
        },
        getUnreadMsg: function() {
            var deferred = $q.deferred();
            $http.get($rootScope.API_HOST + '/messages')
             .then(function(response) {
                deferred.resolve(response);
             }).then(function(error) {
                deferred.reject(error);
             });
            return deferred.promise;
        }
    };
  }])
  .directive('notice',[function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/message.html',
        controller: 'messageCtrl'
    };
  }]);