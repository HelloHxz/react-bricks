import {observable} from 'mobx';
class Store {
    @observable tabSelectedKey = "guanzhu";
    @observable popoverConfig={};
}

export default new Store;

