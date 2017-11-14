import {observable,extendObservable} from 'mobx';


class Store {

    constructor(maps){
        extendObservable(this,maps)
    }
    @observable FormData = {
    	Text1:"default"
    };


}

export default Store;

