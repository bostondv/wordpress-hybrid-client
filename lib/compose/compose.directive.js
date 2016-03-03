export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'composeItemCtrl',
        restrict: 'E',
        scope: {
            item: '=',
            type: '@'
        },
        template: `
            <div ng-include="composeItemCtrl.templateUrl" ng-if="composeItemCtrl.type"></div>
        `
    };

    function Controller($scope, $templateCache, $WPHCCompose) {
        'ngInject';

        var vm = this;
        vm.templateUrl = `compose/${vm.type}.html`;

        if (!$templateCache.get(vm.templateUrl)) {
            throw new Error(`Template ${vm.templateUrl} does not exist`);
        }
        
        vm.submit = function() {
            console.log('submit');
            if (vm.form.$valid) {
                $WPHCCompose.submitPostData(vm.type, vm.item).then((res) => {
                    console.log('Success: ', res);
                }).catch((err) => {
                    console.error('Error: ', err);
                });
            }
        };
    }
}
