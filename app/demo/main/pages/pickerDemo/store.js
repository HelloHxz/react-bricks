import {observable} from 'mobx';
import {Fetch} from 'react-bricks';


class Store {
    @observable FormData = {
    	Text1:"default"
    };

    loadData(id){
	    Fetch("http://localhost:8000/users?page=1",{})
	    .then((data)=>{
	      
	    }).catch((e)=>{
	      
	    });
    }
}

export default Store;

