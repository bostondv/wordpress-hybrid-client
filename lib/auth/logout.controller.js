export default class {
    constructor($injector, $scope) {
        'ngInject';

        this.service = $injector.get('$WPHCLogin');
        this.$state = $injector.get('$state');

        $scope.$on('$ionicView.enter', () => { this.logout(); });
    }

    logout() {
        this.service.unauth();
        this.$state.go('auth.login');
    }
}
