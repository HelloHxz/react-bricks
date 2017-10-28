function isJson(obj){  
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;   
    return isjson;  
} 
export default {
	baseScreen:{
		name:"ipone6",
		width:375*2,
		height:677*2,
		dpr:2,
		rem:75,
		originWidth:375,
		originHeight:667,
	},

	//t: current time（当前时间）；
    //b: beginning value（初始值）；
    //c: change in value（变化量）；
    //d: duration（持续时间）
    run(t, b, c, d){
    	var _this = this;
    	return (
    		function(_t, _b, _c, _d){
    			var isStop = false;
    			var curval = 0;
    			var timeoutID;
    			var re = {
        			start:function(callback,method,endCallBack){
        				if(isStop){
        					return;
        				}
        				method = method||_this.Tween.Expo.easeOut;
        				curval = Math.ceil(method(_t, _b, _c, _d));
        				callback(curval);
        				if (_t < _d) {
			                _t++;
			                timeoutID = setTimeout(()=>{
	        					re.start(callback,method,endCallBack);
	        				});
			            }else{
                            endCallBack&&endCallBack();
                        }
        				
        			},
        			stop:function(){
        				isStop = true;
        				if(timeoutID){
        					clearTimeout(timeoutID);
        				}
        				return curval;
        			}
        		};;
        		return re;
    		}
    	)(t, b, c, d) 
    },
    Tween:{
        Linear (t, b, c, d) {
            return c * t / d + b;
        },
        Quad: {
            easeIn (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut (t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        Back: {
            easeIn (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn (t, b, c, d) {
                return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut (t, b, c, d) {
                if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    },
	
	create(styles,OS,isWeb,pxFun){
		var re = {};
		if(!isJson(styles)){
			return {};
		}
		for(var key in styles){
			var item = styles[key];
			if(typeof item ==='string'||!isNaN(item)){
				var key_arr = key.split("_");
				if(key_arr.length===2){
					var key_os = key_arr[1].toLowerCase();
					// webios webandroid web native nativeios nativeandroid android ios
					if((key_os==="ios"||key_os==="android")){
						if(OS!==key_os){
							continue;
						}
					}else if(key_os==='native'){
						if(isWeb){
							continue;
						}
					}else if(key_os==='web'){
						if(!isWeb){
							continue;
						}
					}else{
						if((isWeb&&key_os.indexOf("web")<0)||(!isWeb&&key_os.indexOf("native")<0)){
							continue;
						}
						if(key_os.indexOf(OS)<0){
							continue;
						}
					}

					key = key_arr[0];
				}
				if(typeof(item)==="string"){
					if(typeof(item.substring(0,1))==='string'){
						re[key] = item;
						continue;
					}
				}
				//todo ....特殊处理 border transform
				if(key==="zIndex"||key==="opacity"||key==="flex"){
					re[key] = (item);
				}else{
					re[key] = pxFun(item);
				}
			}else if(key==='transform'){
				if(isWeb){
					re[key] = (item);
				}else{
					for(var i=0,j=item.length;i<j;i++){
						var sitem = item[i];
						for(var skey in sitem){
							var val = sitem[skey];
							if(skey==="translate"&& val instanceof Array){
								for(var n=0,m=val.length;n<m;n++){
									var xyz = val[n];
									if(typeof xyz==="string"){
										var xyz_arr = xyz.split("%");
										if(xyz_arr.length===2){
											 val[n] = parseFloat(xyz_arr[0])/2+"%"
										}
									}else if(!isNaN(xyz)){
										val[n] = pxFun(xyz);
									}
								}
							}else if(skey==="translateX"||skey==="translateY"){
								var _v =  sitem[skey];
								if(!isNaN(_v)){
									sitem[skey] = pxFun(_v);
								}
							}else if(skey==='rotate'){
								sitem[skey] = parseInt(sitem[skey])+"deg";
							}
						}
					}
					re[key] = (item);
				}
			}else{
				if(isJson(item)){
					re[key] = this.create(item,OS,isWeb,pxFun);
				}
			}
		}
		if(!isWeb&&re.transform){
			
		}
		return re;
	}
}