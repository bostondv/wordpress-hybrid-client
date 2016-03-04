import AbstractItem from '../abstract/AbstractItem.js';

export default class extends AbstractItem {

    constructor($WPHCCompose, $injector, $scope, $templateCache, moment) {
        'ngInject';

        super($injector, $scope);
        this.setType('compose');
        this.setService($WPHCCompose);
        this.$log = $injector.get('$log');
        this.loading = $injector.get('$WPHCLoading');
        this.$cordovaCamera = $injector.get('$cordovaCamera');
        this.slug = _.get(this.$stateParams, 'slug');
        this.setTitle(`compose.${this.slug}.title`);
        this.default = {
            meta: {
                _date: moment().format('YYYY-MM-DD'),
                _attendees: 1
            }
        };
        this.item = angular.extend({}, this.default);
        
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
                this.$log.debug('Post successfully submitted.');
                this.message = {
                    type: 'balanced',
                    content: 'Stand down successfully posted.'
                };
                this.form.$setPristine();
                this.item = this.default;
            }).catch((err) => {
                this.$log.error(err.data.message);
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
    
    getPicture(source) {
        this.message = null;
        if (typeof Camera === 'undefined') {
            return;
        }
        let options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType[source],
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 1024,
            targetHeight: 1024
        };
        this.$cordovaCamera.getPicture(options).then((imageUri) => {
            this.item.featured_media = imageUri;
        }).catch((err) => {
            this.$log.error(err);
            this.item.featured_media = null;
            this.message = {
                type: 'assertive',
                content: err
            };
        });
    }
}