import {observable} from 'mobx';


class Store {
    @observable FormData = {
    	Text1:"default"
    };

    @observable isShow = false;

}

export default Store;

