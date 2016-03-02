export default class {
    constructor($injector, $scope) {
        'ngInject';

        this.loading = $injector.get('$WPHCLoading');
        this.config = $injector.get('$WPHCConfig');
        this.service = $injector.get('$WPHCAuth');
        this.$state = $injector.get('$state');
        this.$log = $injector.get('$log');
        this.$ionicHistory = $injector.get('$ionicHistory');
        this.$ionicNavBarDelegate = $injector.get('$ionicNavBarDelegate');

        $scope.$on('$ionicView.beforeEnter', () => { this.validate(); });
    }
    
    validate() {
        this.service.validate().then((res) => {
            this.$log.debug('User validated from token successfully');
            this.$state.go(this.config.menu.defaultState.state, this.config.menu.defaultState.params);
        }).catch((err) => {
            this.$log.warn('Could not validate user token');
        });
    }

    login() {
        this.error = null;
        if (this.form.$valid) {
            this.loading.show();
            this.processing = true;
            this.service.auth({
                username: this.auth.username,
                password: this.auth.password
            }).then((res) => {
                this.$log.debug('User logged in successfully');
                this.$state.go(this.config.menu.defaultState.state, this.config.menu.defaultState.params);
            }).catch((err) => {
                this.$log.warn(err.message);
                this.error = err.message;
            }).finally(() => {
                this.loading.hide();
                this.processing = false;
            });
        }
    }
}
