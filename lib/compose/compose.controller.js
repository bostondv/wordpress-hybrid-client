import AbstractItem from '../abstract/AbstractItem.js';

export default class extends AbstractItem {

    constructor($WPHCCompose, $injector, $scope, moment) {
        'ngInject';

        super($injector, $scope);
        this.setType('compose');
        this.setService($WPHCCompose);
        this.postTypeName = _.get(this.$stateParams, 'type');
        this.item = {
            meta: {
                _date: moment().format('YYYY-MM-DD'),
                _attendees: 1
            }
        };
    }

    doLoadMore() {
        var self = this;
        if (!this.$stateParams.type){
            return this.$q.reject();
        }
        return this.service.get(this.$stateParams.type, angular.merge(this.getQuery(), _.get(this.config, `[${this.type}].query`) || {})).then((response) => {
            self.postType = response.data;
        });
    }
}