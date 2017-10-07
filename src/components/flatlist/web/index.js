import React from "react"
import StyleSheet from "../../style"
import "./index.less"
import Spin from '../../activityindicator'
import StickyWrapper from './stickywrapper'
import Theme from '../../theme'

class ScrollView extends React.Component {
  constructor(props) {
    super(props)
    this.seed  = 0;
    this.inTouch = false;
    this.tranDict = StyleSheet.getTransitionKeys();
    this.state = {
      offset:-1,
      animate:false,
      refreshState:props.refreshState||"done"// or done loading
    };
    this.startScrollValue = 0;
    this.startY = 0;
    this.isInLoading = 0;

    this.stickyOffset = this.props.stickyOffset||0;
    if(!isNaN(this.stickyOffset)){
      this.stickyOffset = parseInt(this.stickyOffset);
    }else{
      this.stickyOffset = 0;
    }
    this.horizontal = !!this.props.horizontal;
    if(isNaN(this.props.pullHeight)){
      this.pullHeight = StyleSheet.px2px(Theme.flatlist_pullheight);
    }else{
      this.pullHeight = this.props.pullHeight;
    }
    this.disableCheckSticky = props.disableCheckSticky||false;
    this.config = {
      touchkey:"pageX",
      otherToucKey:"pageY"
    };
    if(!this.horizontal){
      this.config = {
         touchkey:"pageY",
         otherToucKey:"pageX"
      }
    }
    if(props.scrollKey&&!props.pageview){
      console.error("ScrollView 组件使用scrollKey去按需加载的时候 必须指定pageview={xxx} xxx指的是所在页面的页面引用");
    }
    if(props.scrollKey){
      if(!props.pageview.scrollViewDict){
        props.pageview.scrollViewDict = {};
      }
      if(props.pageview.scrollViewDict[props.scrollKey]){
        console.error("当前页面ScrollView组件又重复的scrollKey！！")
      }else{
        props.pageview.scrollViewDict[props.scrollKey] = this;
      }
    }
  }

  onTouchStart(e){

    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    if(this.props.onBeforeTouch){
      if(this.props.onBeforeTouch({
        eventName:"start",
        diff:0
      })===false){
        return;
      }
    }
    if(this.isInLoading){
       e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
      return;}
    this.isInLoading = false;
    this.canRefresh = false;
    this.touchAction = "";
    this.diff = 0;
    var touch = e.nativeEvent.touches[0];
    this.startY = touch[this.config.touchkey];
    this.startX = touch[this.config.otherToucKey];
    this.startScrollValue = this.horizontal? this.scrollarea.scrollLeft:this.scrollarea.scrollTop;
    if(this.props.onLoadMore){
      this.wrapperSize = this.horizontal? this.scrollarea.offsetWidth:this.scrollarea.offsetHeight;
    }
    this.scrollHeightSize = this.horizontal? this.scrollarea.scrollWidth: this.scrollarea.scrollHeight;
    this.props.onTouchStart&&this.props.onTouchStart({
      instance:this,
      scroller:this.scrollarea,
      e:e
    });
    this.startOffset = this.state.offset;
  }

  onTouchMove(e){
    if(this.isInLoading){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      return;
    }
    this.inTouch = true;
      var touch = e.nativeEvent.touches[0];
      var curY = touch[this.config.touchkey];
      var curX = touch[this.config.otherToucKey];

      this.diff = curY-this.startY;

      if(this.props.onBeforeTouch){
        if(this.props.onBeforeTouch({
          eventName:"move",
          diff:this.diff
        })===false){
          return;
        }
      }

      var diffOtherDirection = curX - this.startX ;

      if(Math.abs(diffOtherDirection)-Math.abs(this.diff)>20){
        return;
      }


      this.props.onTouchMove&&this.props.onTouchMove({
        diff:this.diff,
        instance:this,
        scroller:this.scrollarea,
        e:e
      });
      this.scrollValue = this.horizontal? this.scrollarea.scrollLeft:this.scrollarea.scrollTop;
      if(this.diff>0&&this.props.onRefresh){
        if(this.scrollValue <=0){
          var l = this.horizontal?0:40;
          if(this.diff>20){ 
            e.preventDefault();
            e.stopPropagation();
            this.scrollarea.classList.add("xz-sv-scrollarea-disabled");
          }
          
          var pullOffsetY = (this.diff- this.startScrollValue)/3;
          this.canRefresh = pullOffsetY> this.pullHeight;
          this.touchAction = "refresh";
          this.setState({offset:pullOffsetY,animate:false});
        }
      }
      if(this.diff<0&&this.props.onLoadMore){
      
        if(this.scrollHeightSize<=this.wrapperSize+this.scrollValue+20){
          this.scrollarea.classList.add("xz-sv-scrollarea-disabled");
          e.preventDefault();
          e.stopPropagation();
          this.touchAction = "loadmore";
          var pullOffset = (this.diff)/3;
          this.canLoadMore = Math.abs(pullOffset)>(this.pullHeight);
          this.setState({offset:pullOffset,animate:false});
        }
      }
  }

  onTouchEnd(){
     this.inTouch = false; 
    if(this.props.onBeforeTouch){
      if(this.props.onBeforeTouch({
        eventName:"end",
        diff:this.diff
      })===false){
        return;
      }
    }
    var scrollKey =this.horizontal?"overflow-x":"overflow-y";
    this.props.onTouchEnd&&this.props.onTouchEnd({
      instance:this,
      diff:this.diff,
      scroller:this.scrollarea,
      e:e
    });
    
    if(this.isInLoading){return;}
    if(this.touchAction==="refresh"){
      if(this.canRefresh){
        this.isInLoading = true;
        this.setState({offset:this.pullHeight,animate:true,refreshState:"loading"});
        this.props.onRefresh();
        if(!this.props.refreshState){
          setTimeout(()=>{
           this.refreshEnd();//只是演示
          },1300);
        }
      }else{
        this.refreshEnd();
      }
    }

    if(this.touchAction==="loadmore"){
      if(this.canLoadMore){
        this.isInLoading = true;
        this.setState({offset:0-this.pullHeight,animate:true,refreshState:"done"});
        this.props.onLoadMore();

        this.loadMoreEnd();
       
      }else{
        this.loadMoreEnd();
      }
    }
    
  }

  refreshEnd(){
    var scrollKey =this.horizontal?"overflow-x":"overflow-y";
    this.isInLoading = false;
    this.setState({offset:-1,animate:true,refreshState:"done"});
    this.scrollarea.classList.remove("xz-sv-scrollarea-disabled");
    this.props.onRefreshClose&&this.props.onRefreshClose();
  }

  loadMoreEnd(){
     var scrollKey =this.horizontal?"overflow-x":"overflow-y";
     this.isInLoading = false;
     this.scrollarea.classList.remove("xz-sv-scrollarea-disabled");
     this.setState({offset:-1,animate:true});
     this.props.onLoadMoreClose&&this.props.onLoadMoreClose();
  }



  _checkSticky(){
    this.seed+=1;
    if(this.seed>1000){
      this.seed = 0 ;
    }
     if(this.seed%3!==0){
      return;
     }
    this.checkSticky();
  }
  checkSticky(){
     var allNOSticky = true;
     if(!this.horizontal&&this.props.pageview&&this.props.pageview.stickviewDict){
        var stickyArr = this.props.pageview.stickviewDict[this.props.scrollKey];
        if(stickyArr&&stickyArr.length>0){
          for(var i=0,j=stickyArr.length;i<j;i++){
            var re = stickyArr[i].checkSticky(this.stickyOffset);
            if(re===true){
              allNOSticky = false;
            }
          }
        }
      }
  }

  _onScroll(e){
    e.stopPropagation();
    this.props.onScroll&&this.props.onScroll({
      instance:this,
      scroller:this.scrollarea,
      e:e
    });

    if(this.props.scrollKey||this.props.onScrollEnd||this.props.onScrollToTail){
      if(!this.disableCheckSticky){
        this._checkSticky();
      }
      if(this.scrollEndTimeoutId){
        window.clearTimeout(this.scrollEndTimeoutId);
        this.scrollEndTimeoutId  = null;
      }
      this.scrollEndTimeoutId = setTimeout(()=>{
        this.checkSticky();
        this.props.onScrollEnd&&this.props.onScrollEnd({
          instance:this,
          scroller:this.scrollarea,
          e:e
        });
        if(this.props.onScrollToTail){
            if(!this.wrapperSize){
              this.wrapperSize = this.horizontal? this.scrollarea.offsetWidth:this.scrollarea.offsetHeight;
            }
            var scrollHeightSize = this.horizontal? this.scrollarea.scrollWidth: this.scrollarea.scrollHeight;
            var scrollValue = this.horizontal? this.scrollarea.scrollLeft:this.scrollarea.scrollTop;
            if(scrollHeightSize<=this.wrapperSize+scrollValue+20){
              this.props.onScrollToTail({instance:this,
                scroller:this.scrollarea,
                e:e});
            }
        }
        if(this.props.scrollKey){
          try{
             var scrollArr = this.props.pageview.onScrollIntoViewDict[this.props.scrollKey];
             for(var i=scrollArr.length-1;i>=0;i--){
                var curImageKey = scrollArr[i];
                var curItem = this.props.pageview.lazyLoadImageDict[curImageKey];
                if(!curItem||curItem.hasLazyLoadDone){
                  if(curItem){
                    delete this.props.pageview.lazyLoadImageDict[curImageKey];
                  }
                  scrollArr.splice(i,1);
                  continue;
                }else{
                  curItem.onScrollIntoView&&curItem.onScrollIntoView();
                }
              }
          }catch(e){}
        }
      },this.props.scrollEndDelayTime||100)
    }
  }

  _renderPullIndicator(){

    var wrapperClassName = this.horizontal?["xz-refresh-control-inner-h"]:["xz-refresh-control-inner-v"];
    if(this.props.renderPullIndicator){
      return  (<div style={{height:this.pullHeight+"px"}} className={wrapperClassName.join(" ")}>{this.props.renderPullIndicator({
        offset:this.state.offset,
        pullHeight:this.pullHeight,
        canRefresh:this.canRefresh,
        isInLoading:this.isInLoading
      })}</div>);
    }
    var child = null;
    if(this.isInLoading){
      child = <span><Spin/></span>;
    }else{
      var text = this.canRefresh?"释放更新":"下拉刷新";
      child = <span>{text}</span>;
    }
    if(this.horizontal){
      wrapperClassName.push("xz-refcon-h-default");
    }else{
      wrapperClassName.push("xz-refcon-v-default");
    }
    return <div style={{height:this.pullHeight+"px"}} className={wrapperClassName.join(" ")}>{child}</div>;
  }

  _renderLoadMoreIndicator(){
    var wrapperClassName = this.horizontal?"xz-loadmore-control-inner-h":"xz-loadmore-control-inner-v";
    var text = this.canLoadMore?"释放加载":"上拉加载更多";
    var child ;
    if(this.props.renderLoadMoreIndicator){
      child = this.props.renderLoadMoreIndicator();
    }else{
      child = <span>{this.state.offset}</span>;
    }
    return <div className={wrapperClassName}>{child}</div>;
  }

  disableScroll(isDisable){
    var className = this.horizontal?"xz-sv-scrollarea-h":"xz-sv-scrollarea-v";
    if(isDisable){
      className += " xz-sv-scrollarea-disabled";
    }else{
       
    }
    this.scrollarea.className = className;
  }

  componentWillReceiveProps(nextPros){
    if(nextPros.refreshState===false||nextPros.refreshState===true){
      this.setState({
        refreshState:nextPros.refreshState
      });
    }
  }

  render() {

    var toucheEvent = {};
    var needTranslate = false;
    if(this.props.onRefresh||this.props.onLoadMore){
      toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
      needTranslate = true;
    }else{
      if(this.props.onTouchMove){
        toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      }
      if(this.props.onTouchStart){
        toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      }
      if(this.props.onTouchEnd){
        toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
      }
    }



    
    var classNameArr = ['xz-scrollview'];
    classNameArr.push(this.horizontal?"xz-scrollview-h":"xz-scrollview-v");
    var scrollAreaClassName = this.horizontal?["xz-sv-scrollarea-h"]:["xz-sv-scrollarea-v"];

    if(this.props.className){
      classNameArr.push(this.props.className);
    }else{
      classNameArr.push("xz-sv-youcansetotherclassname");
    }

    var offset = this.state.offset;
    var needAnimate = this.state.animate;

    if(this.props.onRefresh&&!this.inTouch){
      if(this.state.refreshState==='loading'){
          offset = this.pullHeight;
          this.isInLoading = true;
          scrollAreaClassName.push("xz-sv-scrollarea-disabled");
          needAnimate = true;
      }else{// if(this.state.refreshState==='done')
          offset = -1;
          this.isInLoading = false;
          needAnimate = true;
          if(this.props.onRefreshClose){
            setTimeout(()=>{
             this.props.onRefreshClose();
            },0)
          }
          
      }
     
    }

    var moveStyle = {};
    if(needTranslate){
      var valueStr = this.horizontal?offset+"px,0,0":"0,"+offset+"px,0";
      moveStyle[this.tranDict.transform] ="translate3d("+valueStr+")";
      if(needAnimate){
         moveStyle[this.tranDict.transition] = "all .3s ease";
      }else{
        moveStyle[this.tranDict.transition] = "none";
      }
    }
 

    var scrollEvent = {};
    if(this.props.onScroll||this.props.scrollKey){
      scrollEvent.onScroll = this._onScroll.bind(this);
    }


    var refreshControl = null;
    if(this.props.onRefresh){
      var refreshControlClassName = this.horizontal?"xz-refresh-control-h":"xz-refresh-control-v";
      refreshControl =  <div className={refreshControlClassName}>
          {this._renderPullIndicator()}
        </div>;
    }
    var loadMoreControl = null;
    if(this.props.onLoadMore){
      var loadMoreClassName = this.horizontal?"xz-loadmore-control-h":"xz-loadmore-control-v";
      loadMoreControl =  <div className={loadMoreClassName}>
        {this._renderLoadMoreIndicator()}
        </div>;
    }


    var innerClassName = this.horizontal?"xz-scrollview-inner-h":"xz-scrollview-inner-v";

    this.stickview = null;
    if(this.horizontal){

    }else{
      this.stickview=<StickyWrapper stickyOffset={this.stickyOffset} ref={(instance)=>{this.stickyWrapper = instance}}/>
    }
    var outStyle = this.props.style||{};
    return (<div ref={(wrapper)=>{
      this.wrapperDom = wrapper;
    }} {...toucheEvent} 
    style={outStyle}
    className={classNameArr.join(" ")}>
      {this.stickview}
    	<div className={innerClassName} style={moveStyle} ref={(wrapper)=>{
        this.innerWrapperDom = wrapper;
      }}>
        {refreshControl}
        <div {...scrollEvent} className={scrollAreaClassName.join(" ")}
          ref={(instance)=>{this.scrollarea=instance;}}
        >
          {this.props.children}
        </div>
        {loadMoreControl}
      </div>
     </div>);
  }
}

export default ScrollView;
