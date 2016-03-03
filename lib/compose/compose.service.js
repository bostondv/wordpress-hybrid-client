import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($injector) {
        'ngInject';

        super($injector);
        this.setType('compose');
    }
    
    getCacheUniqueString(type, query){
        return `${this.config.api.baseUrl}${this.type}${type}${query}`;
    }

    getHttpPromise(type) {
        let service = this.$injector.get('$wpApiTypes');
        this.setService(service);
        return this.service.get(type);
    }
    
    submitPostData(type, data) {
        if (!type || !data) {
            return this.$q.reject();
        }
        let service = this.$injector.get('$wpApiCustom').getInstance(type);
        return service.create(data);
    }
}
