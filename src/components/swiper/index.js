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
    var datasource = this.props.datasource||[];
    if(datasource.length===0){
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
        children.push(<View style={{...itemStyle,...{position:"absolute",height:"100%",width:"100%"}}} className="xz-swiper-item" key={key}>
           {this._renderItem({index:i})}
        </View>);
      }

      if(this.props.cache){
         var midSourceIndex = this.sourceArr[1];
         var cacheStyle = {};
         for(var key in this.cacheDict){
          var cacheIndex = this.sourceArr.indexOf(parseInt(key));
          if(cacheIndex<0){
            var sourceIndex_int = parseInt(key);
            var itemKey = 'xz-swiper-item-'+key;
            children.push(<View style={{position:"absolute",height:"100%",width:"100%",width:0,height:0,left:-10}} className="xz-swiper-item" key={itemKey}>
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
