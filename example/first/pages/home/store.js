import {observable} from 'mobx';
class Store {
    @observable popLayerConfig = {};
    @observable popoverConfig = {};
}

export default new Store;

