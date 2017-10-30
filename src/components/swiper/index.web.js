import React from "react"
import "./index.less"
import StyleSheet from "../style"

import Base from './base'





class Swiper extends Base{
  swipUseAnimate(){}

  stopPropagation(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  
  render() {
    var classNameArr = ["xz-swiper"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }else{
      // classNameArr.push("xz-default-swiper");
    }

    var data = this.props.data||[];
    if(data.length===0){
      return <div className={classNameArr.join(" ")}></div>;
    }
    var children= [];

    var toucheEvent = {};
    if(this.props.touchenable!==false){
      toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
    }

    
    if(this.WrapperSizeValue){
      //为了不闪
      var len = this.props.itemWidth?4:3;
      for(var i=0;i<len;i++){
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
        var vstr = this.isHorizontal? v +"px,0,0":"0,"+v+"px,0";
        itemStyle[this.tranDict.transform] = "translate3d("+vstr+")"
        if(this.props.itemWidth){
          itemStyle.width = this.WrapperSizeValue+"px";
        }
        if(!this.animate){
          itemStyle[this.tranDict.transition] = "none";
        }else{
          itemStyle[this.tranDict.transition] = this.tranDict.cssTransform+" .3s ease";
        }
        children.push(<div style={itemStyle} className="xz-swiper-item" key={key}><div className='xz-swiper-inneritem'>
          {this._renderItem({index:i})}
        </div></div>);
      }
      if(this.props.cache){
         var midSourceIndex = this.sourceArr[1];
         var cacheStyle = {};
         for(var key in this.cacheDict){
          var cacheIndex = this.sourceArr.indexOf(parseInt(key));
          if(cacheIndex<0){
            var sourceIndex_int = parseInt(key);
            var cv = ((sourceIndex_int-midSourceIndex)*(this.space+this.WrapperSizeValue));
            var cvstr = this.isHorizontal? cv +"px,0,0":"0,"+cv+"px,0";
            cacheStyle[this.tranDict.transition] = "none"
            cacheStyle[this.tranDict.transform] = "translate3d("+cvstr+")"
            if(this.props.itemWidth){
              cacheStyle.width = this.WrapperSizeValue+"px";
            }
            var itemKey = 'xz-swiper-item-'+key;
            children.push(<div style={cacheStyle} className="xz-swiper-item" key={itemKey}><div className='xz-swiper-inneritem'>
             { this.cacheDict[key]}
            </div></div>);
          }
        }
      }
    }
    return (<div style={this.props.style||{}}  {...toucheEvent} className={classNameArr.join(" ")}>
      {children} 
      {this._renderIndicator()}
      </div>);
  }
}

export default Swiper;
