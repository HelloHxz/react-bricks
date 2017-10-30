import React from "react"
import StyleSheet from "../style"
import View from '../view'
import {LayoutAnimation,UIManager} from 'react-native'
import Base from './base'




class Swiper extends Base {
  
  swipUseAnimate(){
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    LayoutAnimation.easeInEaseOut();
  }

  onStartShouldSetResponder(){
    return true;
  }


  stopPropagation(e){
  }

  render() {
    var data = this.props.data||[];
    if(data.length===0){
      return <div className={classNameArr.join(" ")}></div>;
    }
    var children= [];

    var toucheEvent = {};
    if(this.props.touchenable!==false){
      toucheEvent.onStartShouldSetResponder = this.onStartShouldSetResponder.bind(this);
      toucheEvent.onResponderGrant = this.onTouchStart.bind(this);
      toucheEvent.onResponderMove = this.onTouchMove.bind(this);
      toucheEvent.onResponderRelease = this.onTouchEnd.bind(this);
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
        var itemStyle = {position:"absolute",height:"100%",width:"100%"};
        if(this.props.itemWidth){
          itemStyle.width = this.WrapperSizeValue;
        }
        var v = ((i-1)*this.space+(i-1)*this.WrapperSizeValue+this.state.offset);
        itemStyle[this.isHorizontal?"left":"top"] = v;
        children.push(<View style={itemStyle} className="xz-swiper-item" key={key}>
           {this._renderItem({index:i})}
        </View>);
      }

      if(this.props.cache){
         var midSourceIndex = this.sourceArr[1];
         for(var key in this.cacheDict){
          var cacheIndex = this.sourceArr.indexOf(parseInt(key));
          var cacheItemStyle = {position:"absolute",height:"100%",width:"100%"};
          if(this.props.itemWidth){
            cacheItemStyle.width = this.WrapperSizeValue;
          }
          if(cacheIndex<0){
            var sourceIndex_int = parseInt(key);
            var cv = ((sourceIndex_int-midSourceIndex)*(this.space+this.WrapperSizeValue));
            cacheItemStyle[this.isHorizontal?"left":"top"] = cv;
            var itemKey = 'xz-swiper-item-'+key;
            children.push(<View style={cacheItemStyle} className="xz-swiper-item" key={itemKey}>
              {this.cacheDict[key]}
            </View>);
          }
        }
      }
    }
     // {this._renderIndicator()}
    return (<View style={this.props.style||{}} 
       {...toucheEvent}>
      {children} 
      </View>);
  }
}

export default Swiper;
