export default function($stateProvider, $urlRouterProvider, $httpProvider) {
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
        }).state('auth.logout', {
            url: '/logout',
            views: {
                'content': {
                    controller: "WPHCLogoutController as logoutCtrl"
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
    
    $httpProvider.interceptors.push(($window, $q, $location, $WPHCConfig) => {
        return {
            request: (config) => {
                // Modify request for WP REST API calls only
                if (config.url.indexOf($WPHCConfig.api.baseUrl) === 0) {
                    config.headers = config.headers || {};
                    // delete config.headers['Content-Type'];
                    // config.transformRequest = null;
                    let token = $window.localStorage.getItem('token');
                    // If there is a token add the Authorization header in each request
                    if (token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    console.log(config);
                }
                return config;
            }
        };
    });
}
