export default class {
    constructor($injector, $scope) {
        'ngInject';

        this.service = $injector.get('$WPHCLogin');
        this.$state = $injector.get('$state');

        $scope.$on('$ionicView.enter', () => { this.validate(); });
    }
    
    validate() {
        this.service.validate().then((res) => {
            console.log('SUCCESS', res);
            this.$state.go('public.pages');
        }).catch((err) => {
            console.log('ERROR', err);
        });
    }

    login() {
        if (this.form.$valid) {
            this.service.auth({
                username: this.auth.username,
                password: this.auth.password
            }).then((res) => {
                console.log(res);
                this.$state.go('public.pages');
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
