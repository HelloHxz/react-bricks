import {observable} from 'mobx';
import {Fetch} from 'react-bricks'
class Store {

	
    getMethod(){
	    Fetch("http://localhost:8000/demoget?delay=5000",{
	    	body:{
	    		code:0
	    	},
	    	timeout:6000
	    })
	    .then((data)=>{
	    	alert("success");
	      
	    }).catch((e)=>{
	    	alert(e);
	      
	    });
    }

     postMethod(){
	    Fetch("http://localhost:8000/demopost?delay=1000",{
	    	body:{
	    		code:0,
	    		postdata:"clientpostdata"
	    	},
	    	method:"post",
	    	timeout:6000
	    })
	    .then((data)=>{
	    	alert(JSON.stringify(data));
	    }).catch((e)=>{
	    	alert(e);
	    });
    }

}

export default Store;

