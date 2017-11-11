import {observable} from 'mobx';
class Store {
    @observable tabSelectedKey = "";
    @observable showMidPage = false;
    @observable popLayerConfig = {};
}

export default new Store;

