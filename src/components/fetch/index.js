
import PlatForm from '../platform'

var oldFetchfn = fetch; 
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw {
  	msg:response.statusText,
  	status:response.status,
  	response:response
  };
}

var nfetch = function(url, opts){
	if(PlatForm.OS==='android'&&url.indexOf("localhost")>=0){
		url = url.replace("localhost","10.0.2.2");
	}
	opts = opts||{};
	if(["include","same-origin","omit"].indexOf(opts.credentials)<0){
		opts.credentials = "include";
	}
	var method = (opts.method||"get").toLowerCase();
	opts.method = method;
	if(method==="post"){
		opts.headers=opts.headers||{};
		if(!opts.headers["Content-Type"]){
			opts.headers["Content-Type"] = 'application/json';
		}
		if(!opts.headers["Accept"]){
			opts.headers["Accept"] = 'application/json';
		}
		if(typeof(opts.body)!=="string"){
			opts.body = JSON.stringify(opts.body);
		}
	}else if(method==="get"){
		var body = opts.body||{};
		var urlArr = url.split("?");
		var bodyStrArr = [];
		for(var key in body){
			bodyStrArr.push(key+"="+body[key]);
		}
		var bodyStr = bodyStrArr.join("&");
		if(urlArr.length===2){
			url = url+"&"+bodyStr;
		}else{
			url = url+"?"+bodyStr;
		}
		delete opts.body;
	}
    var fetchPromise = oldFetchfn(url, opts);
    var timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
           reject({
		  	msg:'timeout',
		  	status:408,
		  	response:null
		  })
        }, opts.timeout||8000)
    });
    return Promise.race([fetchPromise, timeoutPromise]).then(checkStatus);
}



export default (url,config)=>{
	return nfetch(url, config).then((response)=>{
      return response.json();
    })
}