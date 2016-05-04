angular.module('phyman.message',['ngMaterial'])
  .controller('messageCtrl',['$scope','$rootScope','$state','MsgService',
    function($scope,$rootScope,$state,MsgService){
    $scope.showNotice = false;
    MsgService.getUnreadMsg()
     .then(function(response) {
        $scope.notice = response.data.message;
        $scope.showNotice = true;
     },function(error) {
        $scope.notice = {};
        $scope.showNotice = false;
     });
    MsgService.on('new_msg',function(data) {
        // Message is a json object.
        // {
        //   from: '',
        //   content: '',
        //   action: ''
        // }
        $scope.notice = angular.fromJson(data);
        $scope.showNotice = true;
    });
    $scope.onClick = function($event) {
        // Do something when clicking the message.
        // $event.stopPropagation();
        // $state.go($scope.notice.action);
    }
  }])
  .factory('MsgService',['$rootScope','$http','$q',function($rootScope,$http,$q){
    var SOCKET_HOST = 'http://119.29.6.121:2120';
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
        emit: function(eventName,data,callback) {
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
            var deferred = $q.defer();
            $http.get($rootScope.API_HOST + '/Home/Admin/messages')
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