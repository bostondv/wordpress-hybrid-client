export default class {
    constructor($scope, $injector, WpApi) {
        'ngInject';

        this.config = $injector.get('$WPHCConfig');
        this.users = $injector.get('$wpApiUsers');
        this.loginService = $injector.get('$WPHCAuth');
        this.$state = $injector.get('$state');
        this.$http = $injector.get('$http');
        this.$ionicHistory = $injector.get('$ionicHistory');
        this.$ionicNavBarDelegate = $injector.get('$ionicNavBarDelegate');
        this.sliderOptions = {};
        $scope.data = {};
        
        $scope.$watch(() => { return $scope.data.slider; }, (value) => {
            this.slider = value;
        });
    }
    
    next() {
        if (this.slider.isEnd) {
            this.register();
        } else {
            this.slider.slideNext();
        }
    }
    
    register() {
        if (this.form.$valid) {
            this.profile.username = this.profile.email;
            // Login as API Admin
            this.loginService.auth({
                username: this.config.auth.user,
                password: this.config.auth.password
            }).then((res) => {
                console.log(res);
                // Create new user
                return this.users.create(this.profile);
            }).then((res) => {
                console.log(res);
                // Remove admin auth
                this.loginService.unauth();
                // Login as user
                return this.loginService.auth({
                    username: this.profile.username,
                    password: this.profile.password
                });
            }).then((res) => {
                console.log(res);
                this.$state.go(this.config.menu.defaultState.state, this.config.menu.defaultState.params);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
