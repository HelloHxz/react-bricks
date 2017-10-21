import Common from './common'

var translateKeys;
var u = navigator.userAgent;
var Re = {
	OS:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)?"ios":"android",
	isWeb:true,
	_init(){
		if(this.rem){
			return;
		}
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
		this.screen.dpr = window.devicePixelRatio || 1;
		var docClientWidth =  docEl.clientWidth;
		var docClientHeight = docEl.clientHeight;
		this.rem = docClientWidth * this.screen.dpr / 10;
		this.screen.width = docClientWidth*this.screen.dpr;
		this.screen.originWidth = docClientWidth*this.screen.dpr;
		this.screen.originHeight = docClientHeight*this.screen.dpr;
		this.screen.height = docClientHeight*this.screen.dpr;

		var scale = 1 / this.screen.dpr;
		var fontEl = document.createElement('style');
		var metaEl = document.querySelector('meta[name="viewport"]');
		metaEl.setAttribute('content', 'width=' + this.screen.dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
		docEl.setAttribute('data-dpr', this.screen.dpr);
		docEl.firstElementChild.appendChild(fontEl);
		fontEl.innerHTML = 'html{font-size:' + this.rem+ 'px!important;}';
	},
	create(styles){
		return Common.create(styles,this.OS,this.isWeb,this.px.bind(this));
	},
	_px(val){
		try{
			val = parseFloat(val);
		}catch(e){
			val = 0;
		}
		//iphone6 为标准 px为标准  
		//比如想要screen.width/3 这样的效果 只能使用 (375*2)/3 值为250 这样去标示 
		return ((val/Common.baseScreen.rem));
	},
	px(val){
		return this._px(val)+"rem";
	},
	rem:0,
	baseScreen:Common.baseScreen,
	screen:{
		dpr:0,
		originWidth:0,
		originHeight:0,
		width:0,
		height:0
	},
	px2px(v){
        return Math.round(v*this.screen.dpr/2);
    },
	getTransitionKeys () {
        if (translateKeys) {
            return translateKeys;
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
        translateKeys = me;
        return me;
    },
	convertTransform(style,isAnimateView){
		if(!style.transform){
			return style;
		}
		var values = style.transform ;
		var needConvert = true;
		var re = [];
		/*
			transform:[
				{translate:[]},
				{translateX:""},
				{rotate:"11deg"}
			]
			to
			transform:"translate3d(x,t,z) rotate(v)"
		*/
		var hasJoin = {};
		for(var i=values.length-1;i>=0;i--){
			if(!needConvert){
				break;
			}
			var item = values[i];
			for(var key in item){
				//去重复
				if(hasJoin[key]){
					continue;
				}
				hasJoin[key] = true;
				var value = item[key];
				if(typeof(value)==="string"){
					re.push(key+"("+value+")");
				}else if(!isNaN(value)){
					if(key==="translateX"||key==="translateY"){
						// value = this.px(value);
						if(isAnimateView){
							re.push(key+"("+value+"rem)");
						}else{
							value = this.px(value);
						}
					}else if(key==="rotate"){
						re.push(key+"("+value+"deg)");
					}

				}else if(value instanceof Array){
					if(key==="translate"){
						key = "translate3d";
					}
					for(var n=0,m=value.length;n<m;n++){
						if(!isNaN(value[n])){
							value[n] =this.px(value[n]);
						}
					}
					var zeroCount = 3-value.length;
					if(zeroCount>0){
						for(var i=0;i<zeroCount;i++){
							value.push(0);
						}
					}
					re.push(key+"("+value.join(",")+")");
				}else{
					needConvert = false;
					break;
				}
			}
			
		}
		if(needConvert){
			style.transform = re.join(" ");
		}
		return style;
	}
};

Re._init();

export default Re;