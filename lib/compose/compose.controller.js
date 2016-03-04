import AbstractItem from '../abstract/AbstractItem.js';

export default class extends AbstractItem {

    constructor($WPHCCompose, $injector, $scope, $templateCache, moment) {
        'ngInject';

        super($injector, $scope);
        this.setType('compose');
        this.setService($WPHCCompose);
        this.loading = $injector.get('$WPHCLoading');
        this.slug = _.get(this.$stateParams, 'slug');
        this.setTitle(`compose.${this.slug}.title`);
        this.item = {
            meta: {
                _date: moment().format('YYYY-MM-DD'),
                _attendees: 1
            }
        };
        
        this.templateUrl = `compose/${this.slug}.html`;

        if (!$templateCache.get(this.templateUrl)) {
            throw new Error(`Template ${this.templateUrl} does not exist`);
        }
    }
    
    submit() {
        this.message = null;
        if (this.form.$valid) {
            this.processing = true;
            this.loading.show();
            this.service.submitPost(this.slug, this.item).then((res) => {
                console.log('Success: ', res);
                this.message = {
                    type: 'balanced',
                    content: 'Stand down successfully posted.'
                };
            }).catch((err) => {
                console.error('Error: ', err);
                this.message = {
                    type: 'assertive',
                    content: err.data.message
                };
            }).finally(() => {
                this.loading.hide();
                this.processing = false;
            });
        }
    }
}