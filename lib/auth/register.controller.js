export default class {
    constructor($scope, $injector, WpApi) {
        'ngInject';

        this.config = $injector.get('$WPHCConfig');
        this.users = $injector.get('$wpApiUsers');
        this.loginService = $injector.get('$WPHCLogin');
        this.$state = $injector.get('$state');
        this.$http = $injector.get('$http');
        this.sliderOptions = {};
        $scope.data = {};
        
        $scope.$watch(() => { return $scope.data.slider; }, (value) => {
            this.slider = value;
        });
    }
    
    next() {
        this.slider.slideNext();
    }
    
    register() {
        if (this.form.$valid) {
            this.profile.username = this.profile.email;
            // Login as API Admin
            this.loginService.auth({
                username: this.config.api.user,
                password: this.config.api.password
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
                this.$state.go('public.pages');
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
