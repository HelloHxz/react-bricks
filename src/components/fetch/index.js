


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
	opts = opts||{};
	if(["include","same-origin","omit"].indexOf(opts.credentials)<0){
		opts.credentials = "include";
	}
	if(opts.method&&opts.method.toLowerCase()==='post'){
		opts.headers=opts.headers||{};
		if(!opts.headers["Content-Type"]){
			opts.headers["Content-Type"] = 'application/json';
		}
		if(!opts.headers["Accept"]){
			opts.headers["Accept"] = 'application/json';
		}
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
	return nfetch(url, config);
}