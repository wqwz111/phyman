angular.module('phyman.settings')
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
  	$stateProvider
  		.state('settings',{
  			url: '/settings',
  			templateUrl: 'views/settings.html'
  		})
        .state('settings.reset_password',{
            url: '/reset_password',
            templateUrl: 'views/reset_password.html',
            controller: 'SettingsCtrl',
            data: {
                permissions: {
                    except: ['anonymous'],
                    redirectTo: 'error'
                }
            }
        })
        .state('settings.update_email',{    
           url: '/update_email',   
           templateUrl: 'views/update_email.html',   
           controller: 'SettingsCtrl',   
           data: {   
               permissions: {    
                   except: ['anonymous'],    
                   redirectTo: 'error'   
               }   
           }   
       });
  }])