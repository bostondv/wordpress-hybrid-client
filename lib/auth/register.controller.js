export default class {
    constructor($scope, $state, $injector, $wpApiUsers, WpApi) {
        'ngInject';
        
        WpApi.setBasicCredentials('admin', 'admin');
        
        this.config = $injector.get('$WPHCConfig');
        this.users = $wpApiUsers;
        this.$state = $state;
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
            this.users.create(this.profile).then((res) => {
                console.log(res.data);
                // Log user in and make sure they are remembered
                // Go to app
                this.$state.go('public.pages');
            }).catch((err) => {
                console.error(err.data.message);
            });
        }
    }
}
