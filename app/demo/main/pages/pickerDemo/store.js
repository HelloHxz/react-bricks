import {observable} from 'mobx';


class Store {
    @observable FormData = {
    	Text1:"default"
    };

    @observable isShow = true;

}

export default Store;

