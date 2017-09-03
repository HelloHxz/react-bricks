   (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback) {
        var id = window.setTimeout(function() {
            callback();
        }, 0);
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

export default {
	rem:0,
	dpr:0,
	_shipei(){

        var startY = 0;
        document.addEventListener('touchstart',function (event) {  
            startY = event.touches[0].pageY;
            if(event.touches.length>1){  
                event.preventDefault();  
            }  
        })  
        var lastTouchEnd=0;  
        
        document.addEventListener('touchend',function (event) {  
            var now=(new Date()).getTime();  
            if(now-lastTouchEnd<=300){  
                event.preventDefault();  
            }  
            startY = 0;
            lastTouchEnd=now;  
        },false)  
            
		var docEl = document.documentElement;
		this.dpr = window.devicePixelRatio || 1;
		var docClientWidth =  docEl.clientWidth;
		var docClientHeight = docEl.clientHeight;
		this.rem = docClientWidth * this.dpr / 10;
		this.screen.width = docClientWidth*this.dpr;
		this.screen.originWidth = docClientWidth;
		this.screen.originHeight = docClientHeight;
		this.screen.height = docClientHeight*this.dpr;

		var scale = 1 / this.dpr;
		var fontEl = document.createElement('style');
		var metaEl = document.querySelector('meta[name="viewport"]');
		metaEl.setAttribute('content', 'width=' + this.dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
		docEl.setAttribute('data-dpr', this.dpr);
		docEl.firstElementChild.appendChild(fontEl);
		fontEl.innerHTML = 'html{font-size:' + this.rem+ 'px!important;}';
	},
	screen:{
		width:0,
		originWidth:0,
		originHeight:0,
		height:0
	},
	rem2px(v){
		if(this.rem===0){
			this._shipei();
		}
		v = parseFloat(v);
		return v * this.rem;		
	},
	px2rem(v){
		if(this.rem===0){
			this._shipei();
		}
		v = parseFloat(v);
		return v / this.rem;
	},
    px2px(v){
        return Math.round(v*this.dpr/2);
    },
	createSheet(styles){
		alert(styles);
	},
	translateKeys:null,
	getTransitionKeys () {
        if (this.translateKeys) {
            return this.translateKeys;
        }
        var testStyle = document.createElement("DIV").style;
        var me = {};
        if ("-webkit-transform" in testStyle) {
            me.transitionend = "webkitTransitionEnd";
            me.transform = "WebkitTransform";
            me.cssTransform = "-webkit-transform";
            me.transition = "WebkitTransition";
        }
        else {
            me.transitionend = "transitionend";
            me.transform = "transform";
            me.cssTransform = "transform";
            me.transition = "transition";
        }
        this.translateKeys = me;
        return me;
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
        				method = method||_this.Tween.Cubic.easeOut;
        				curval = Math.ceil(method(_t, _b, _c, _d));
        				callback(curval);
        				if (_t < _d) {
			                _t++;
			                timeoutID = requestAnimationFrame(()=>{
	        					re.start(callback,method,endCallBack);
	        				});
			            }else{
                            endCallBack&&endCallBack();
                        }
        				
        			},
        			stop:function(){
        				isStop = true;
        				if(timeoutID){
        					cancelAnimationFrame(timeoutID);
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
    }

}