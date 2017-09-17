import {observable} from 'mobx';
class Store {
    @observable tabSelectedKey = "chat/my";
}

export default new Store;

