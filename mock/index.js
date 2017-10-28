var Mock  = require("mockjs");
var bodyParser = require('body-parser');
var FirstMock =require("./firstMock");


var AllApi = Object.assign({},FirstMock)


module.exports = (app)=>{
    // parse application/x-www-form-urlencoded
      app.use(bodyParser.urlencoded({ extended: false }))

      // parse application/json
      app.use(bodyParser.json())

      for(var key in AllApi){
      	(
      		function(_key,_fun){
      			var keyInfo = _key.split(" ");
		      	if(keyInfo.length===2){
			      	var ajaxType = keyInfo[0].toUpperCase();
			      	var url = keyInfo[1];
			      	var method;
			      	if(ajaxType==="GET"){
			      		app.get(url,function(req,res){
				      		_fun(req,res);
				      	});
			      	}else if(ajaxType==="POST"){
			      		app.post(url,function(req,res){
				      		_fun(req,res);
				      	});
			      	}else{
			      	}
		      	}
      		}

      	)(key,AllApi[key]);
      
      }


};

