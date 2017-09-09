export default {
	_init(){
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
		this.screen.originWidth = docClientWidth;
		this.screen.originHeight = docClientHeight;
		this.screen.height = docClientHeight*this.screen.dpr;

		var scale = 1 / this.screen.dpr;
		var fontEl = document.createElement('style');
		var metaEl = document.querySelector('meta[name="viewport"]');
		metaEl.setAttribute('content', 'width=' + this.screen.dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
		docEl.setAttribute('data-dpr', this.screen.dpr);
		docEl.firstElementChild.appendChild(fontEl);
		fontEl.innerHTML = 'html{font-size:' + this.rem+ 'px!important;}';
	},
	create(){

	},
	px(val){
		
	},
	rem:0,
	screen:{
		dpr:0,
		originWidth:0,
		originHeight:0,
		width:0,
		height:0
	},
}