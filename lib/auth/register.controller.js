export default class {
    constructor($scope, $state) {
        'ngInject';
        
        this.$state = $state;
        
        $scope.data = {};
        
        $scope.$watch(() => { return $scope.data.slider; }, (value) => {
            this.slider = value;
        });
        
        this.sliderOptions = {};
    }
    
    next() {
        this.slider.slideNext();
    }
    
    register() {
        this.$state.go('public.pages');
    }
}
