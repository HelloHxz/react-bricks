import React from "react"
import StyleSheet from "../style"
import View from '../view'





class Swiper extends React.Component {
  constructor(props) {
    super(props)
    this.space =  this.props.space || 0;
    this.touchoffset = this.props.touchoffset || 120;
    this.init(props,false);
    this.animate = false;
    this.state = {
      offset:0,
    };



  }

  parseSelectedInt(selectedIndex,props){
      selectedIndex = selectedIndex||0;
      selectedIndex = isNaN(selectedIndex)?0:parseInt(selectedIndex);
      selectedIndex = selectedIndex>=props.datasource.length?props.datasource.length-1:selectedIndex;
      selectedIndex = selectedIndex<0?0:selectedIndex;
      return selectedIndex;
  }

  init(props,isReciveProps){
    this.needRebind= true;
    if(isReciveProps){
      if(JSON.stringify(this.props.datasource)===JSON.stringify(props.datasource)){
        this.needRebind = false;
      }
    }

    
    this.isIntransition = false;
   

    var direction = props.direction||"horizontal";
    this.isHorizontal = direction.toLowerCase()==="horizontal";
    this.config = {
      touchkey:"pageX",
      othertouchkey:"pageY"
    };
   if(this.isHorizontal){
      this.WrapperSizeValue = StyleSheet.screen.originWidth;
    }else{
      this.WrapperSizeValue = 200;
    }
    if(!this.isHorizontal){
      this.config = {
        touchkey:"pageY",
        othertouchkey:"pageX"
      };
    }



    this.isLoop = props.loop;
    if(this.needRebind){
      var selectedIndex = this.parseSelectedInt(props.selectedIndex,props);

      this.wrapperArr = [2,0,1];
      this.cacheDict = {};
      this.sourceArr = [-1,selectedIndex-1,-1];
      this.getNextSourceArr();
    }else{
      //如果selectedIndex变化 则跳转props.selectedIndex
      var from = this.parseSelectedInt(this.props.selectedIndex,this.props);
      var to = this.parseSelectedInt(props.selectedIndex,props);
      if(from!==to){
        this.swipeFromTo(from,to);
      } 

    }

    var datasource = props.datasource||[];
    if(datasource.length>1){
      this.startInterval();
    }else{
      this.stopInterval();
    }
  }

  goNextByStep(step){
    if(this.goNextTimeoutID){
      this.goNextTimeoutID = null;
      clearTimeout(this.goNextTimeoutID);
    }
    this.animate = true;  
    this.isIntransition = true;
    this.setState({offset:step*(0-this.WrapperSizeValue-this.space)});
    this.goNextTimeoutID = setTimeout(()=>{
      for(var i=0;i<step;i++){
        this.getNextWraperArr();
        this.getNextSourceArr();
      }
      this.setIsInTransitionFalse();
      this.setState({offset:0});
      this.startInterval();
    },310)
  }

  goPreByStep(step){
    this.animate = true;  
    this.isIntransition = true;
    this.setState({offset:step*(this.WrapperSizeValue+this.space)});
    setTimeout(()=>{
      for(var i=0;i<step;i++){
        this.getPreWraperArr();
        this.getPreSourceArr();
      }
      this.setIsInTransitionFalse();
      this.setState({offset:0});
      this.startInterval();
    },310)
  }

  swipeFromTo(from,to){
    var diff = to-from;
    if(diff<0){
      this.goPreByStep(Math.abs(diff));
    }else{
      this.goNextByStep(Math.abs(diff));
    }
  }

  goNext(){
    this.goNextByStep(1);
  }

  goPre(){
    this.goPreByStep(1);
  }

  componentWillUnmount(){
    this.stopInterval();
  }

  stop(){
    this.stopInterval();
  }

  stopInterval(){
    if( this.goNextTimeoutID){
      this.setIsInTransitionFalse();
      this.goNextTimeoutID = null;
      clearTimeout(this.goNextTimeoutID);
    }
    if(this.intervalID){
        clearInterval(this.intervalID);
        this.intervalID = null;
    }
  }
  start(){
    this.startInterval();
  }
  startInterval(){
    if(!this.props.interval){
      return;
    }
    this.stopInterval();
    var interval = 0;
      if(this.props.interval){
        if(isNaN(this.props.interval)){
          interval = 800;
        }else{
          interval = parseInt(this.props.interval);
        }
      }
      
      if(interval>0){
        this.intervalID = setInterval(()=>{
          this.goNext();
        },interval)
      }
  }

  getPreSourceArr(){
    var len = this.props.datasource.length;
  
    var mid = this.sourceArr[1];
    mid -= 1;
    if(mid<0){
      if(this.isLoop){
        mid =len===1?0:len-1;
      }else{
        mid +=1;
      }
    }
    var lr = this.getLeftRightIndexByMid(mid,len);
    var arr = [lr.left,mid,lr.right];
    this.sourceArr = arr;
  }

  getNextSourceArr(){
    var len = this.props.datasource.length;
   
    var mid = this.sourceArr[1];
    mid += 1;
    if(mid>len-1){
      if(this.isLoop){
        mid =len ===0?-1:0;
      }else{
        mid -=1;
      }
    }
    var lr = this.getLeftRightIndexByMid(mid,len);
    var arr = [lr.left,mid,lr.right];
    this.sourceArr = arr;
  }


  getLeftRightIndexByMid(mid,len){
    var right;
    if(mid === -1){
      right = -1;
    }else{
      right = mid + 1;
      if(right>len-1){
        if(this.isLoop){
          right = len ===1?-1:0;
        }else{
          right = -1;
        }
      }
    }

    var left = mid - 1;
    if(left<0){
      if(this.isLoop){
        left =len ===1?-1:len-1;
      }else{
        left = -1;
      }
    }
    return {left:left,right:right}
  }




  getNextWraperArr(){
    this.wrapperArr.push(this.wrapperArr.shift());
  }

  getPreWraperArr(){
    this.wrapperArr.unshift(this.wrapperArr.pop());
  }



  onTouchStart(e){
    this.touchStartValue = e.nativeEvent.touches[0][this.config.touchkey];
    this.touchOtherStartValue =  e.nativeEvent.touches[0][this.config.othertouchkey];
    if(this.isIntransition){return;}
    this.stopInterval();
    this.starttime = new Date().valueOf();

    this.diff = 0;
    this.animate = false;  
    this.offsetValue = this.state.offset;
    this.resetPos = false;

    
  }

  onTouchMove(e){
    if(this.isIntransition){return;}
    var curTouchX = e.nativeEvent.touches[0][this.config.touchkey];
    var touchOtherValue =  e.nativeEvent.touches[0][this.config.othertouchkey];
    this.diff =  curTouchX - this.touchStartValue;
    this.otherdiff = touchOtherValue - this.touchOtherStartValue;

    if(Math.abs(this.otherdiff)-Math.abs(this.diff)>20){
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  
    this.animate = false;  
    var offset = this.offsetValue;
    if(this.diff>0){
      //gopre
      if(this.sourceArr[0]===-1){
        this.diff = this.diff/3;
        this.resetPos = true;
      }
    }else{
      //gonext
      if(this.sourceArr[2]===-1){
        this.diff = this.diff/3;
        this.resetPos = true;
      }
    }

    offset = offset+this.diff;
    this.setState({offset:offset});
  }

  setIsInTransitionFalse(){
       this.animate = false;
       this.isIntransition = false;
  }
  setEnable(){
      setTimeout(()=>{
        this.setIsInTransitionFalse();
        this.startInterval();
      },300);
  }
  onTouchEnd(){

    if(this.isIntransition){return;}
    this.isIntransition = true;

    if(this.diff===0){
      this.setEnable();
      return;
    }
    if(Math.abs(this.diff)<this.touchoffset||this.resetPos){
      this.animate = true;
      this.setState({offset:(0-this.offsetValue)});
      this.setEnable();
      return;
    }

    if(this.diff>0){
      if(this.sourceArr[0]!==-1){
        this.goPre();
      }else{
        this.setEnable();
      }
    }else{
      if(this.sourceArr[2]!==-1){
       this.goNext();
      }else{
        this.setEnable();
      }
    }
    
  }



  componentWillReceiveProps(nextProps){ 
    this.init(nextProps,true);
  }


  _renderItem(params){
    var childrenItem = null;
    var index = params.index;
    var sourceIndex = this.sourceArr[index];
    if(index===0||index===2){
      //如果只有两个数据源的话 两边都一样的话 根据方向只显示一个
      if(this.sourceArr[0]===this.sourceArr[2]){
        if(this.diff>=0&&index===2){
          return null;
        }
        if(this.diff<0&&index===0){
          return null;
        }
      }
    }


    if(sourceIndex!==-1){
      childrenItem = this.cacheDict[sourceIndex.toString()];
      if((this.props.lazyrender&&index===1&&!childrenItem)||!this.props.lazyrender){
        if(!childrenItem){
          if(this.props.renderItem){
            childrenItem = this.props.renderItem({index:sourceIndex,data:this.props.datasource[sourceIndex]});
            if(this.props.cache){
              this.cacheDict[sourceIndex.toString()] = childrenItem;
            }
          }
        }else{

        }
      }
    }
   
    return childrenItem;
  }

  _renderIndicator(){
    var curIndex = this.sourceArr[1];
    var datasource  =this.props.datasource||[];
    var len = datasource.length;
    if(this.props.renderIndicator){
      return this.props.renderIndicator({
        length:len,
        curIndex:curIndex
      });
    }
 
    var point = [];
    for(var i=0;i<len;i++){
      point.push(<span className={i===curIndex?"xz-swipe-selin":"xz-swipe-in"} key={i}></span>);
    }
    return <div className="xz-swipe-default-indwrap">{point}</div>;
  }



  render() {
    var classNameArr = ["xz-swiper"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }else{
      // classNameArr.push("xz-default-swiper");
    }

    var datasource = this.props.datasource||[];
    if(datasource.length===0){
      return <div className={classNameArr.join(" ")}></div>;
    }
    var children= [];

    var toucheEvent = {};
    if(this.props.touchenable!==false){
      // toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      // toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      // toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
    }
    if(this.WrapperSizeValue){
      for(var i=0;i<3;i++){
        var wrapIndex = this.wrapperArr[i];
        var sourceIndex = this.sourceArr[i];
        if(sourceIndex===-1){
          continue;
        }
        var key = 'xz-swiper-item-'+sourceIndex;
        if(this.sourceArr[0]===this.sourceArr[2]){
          //&&i!==1
          key+="_"+wrapIndex;
        }

        
        var itemStyle = {};
        var v = ((i-1)*this.space+(i-1)*this.WrapperSizeValue+this.state.offset);
        itemStyle[this.isHorizontal?"left":"top"] = v;
        // if(!this.animate){
        //   itemStyle[this.tranDict.transition] = "none";
        // }else{
        //   itemStyle[this.tranDict.transition] = this.tranDict.cssTransform+" .3s ease";
        // }
        children.push(<View style={{...itemStyle,...{position:"absolute",height:"100%",width:"100%"}}} className="xz-swiper-item" key={key}>
          {this._renderItem({index:i})}
        </View>);
      }


      // if(this.props.cache){
      //    var midSourceIndex = this.sourceArr[1];
      //    var cacheStyle = {};
      //    for(var key in this.cacheDict){
      //     var cacheIndex = this.sourceArr.indexOf(parseInt(key));
      //     if(cacheIndex<0){
      //       var sourceIndex_int = parseInt(key);
      //       var cv = ((sourceIndex_int-midSourceIndex)*(this.space+this.WrapperSizeValue));
      //       var cvstr = this.isHorizontal? cv +"px,0,0":"0,"+cv+"px,0";
      //       cacheStyle[this.tranDict.transition] = "none"
      //       cacheStyle[this.tranDict.transform] = "translate3d("+cvstr+")"

      //       var itemKey = 'xz-swiper-item-'+key;
      //       children.push(<View style={cacheStyle} className="xz-swiper-item" key={itemKey}><View className='xz-swiper-inneritem'>
      //        { this.cacheDict[key]}
      //       </View></View>);
      //     }
      //   }
      // }
    }
     // {this._renderIndicator()}
    return (<View style={this.props.style||{}} 
       {...toucheEvent} className={classNameArr.join(" ")}>
      {children} 
      </View>);
  }
}

export default Swiper;
