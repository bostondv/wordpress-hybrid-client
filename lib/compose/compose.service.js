import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($injector) {
        'ngInject';

        super($injector);
        this.setType('compose');
    }
    
    submitPost(slug, data) {
        if (!slug || !data) {
            return this.$q.reject();
        }
        let service = this.$injector.get('$wpApiCustom').getInstance(slug);
        return service.create(data);
    }
}
