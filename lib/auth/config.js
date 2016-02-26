export default function($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('auth', {
          url: '/auth',
          abstract: true,
          views: {
            '@': {
              templateProvider: ($templateCache) => $templateCache.get('module/auth/auth.html'),
            }
          }
        }).state('auth.login', {
            url: '/login',
            views: {
              'content': {
                templateProvider: ($templateCache) => $templateCache.get('module/auth/login.html'),
                controller: "WPHCLoginController as loginCtrl"
              }
            }
        }).state('auth.register', {
            url: '/register',
            views: {
              'content': {
                templateProvider: ($templateCache) => $templateCache.get('module/auth/register.html'),
                controller: "WPHCRegisterController as registerCtrl"
              }
            }
        }).state('auth.page', {
            url: '/page/:id',
            views: {
              'content': {
                templateProvider: ($templateCache) => $templateCache.get('module/pages/item.html'),
                controller: "WPHCPageController as pageCtrl"
              }
            }
        });
        
    $urlRouterProvider.when('/auth', '/auth/login');
}
