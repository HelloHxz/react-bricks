import React from "react"
import View from '../view'
import Text from '../text'
import SildeModal from '../slideModal'
import Modal from '../modal';
import PlatForm from '../platform'
import StyleSheet from "../style"
import Base from './common'


function getPageX(e){
	if(StyleSheet.isWeb){
		return e.touches[0].pageX;
	}
	return  e.nativeEvent.pageX;
}

function getPageY(e){
	if(StyleSheet.isWeb){
		return e.touches[0].pageY;
	}
	return  e.nativeEvent.pageY;
}

class SelectorColumn extends React.Component{
   constructor(props) {
    super(props)
    props.parent.instanceDict[props.pkey] = this;
    this.tranDict = StyleSheet.getTransitionKeys();
    this.selectedIndex = props.selectedIndex||0;
    this.state={
      offset:0-this.selectedIndex*props.itemHeight,
      data:props.data
    };

    this.scrollHeight =this.props.itemHeight*(this.state.data.length-1);
    this.bottomLimit = 0-this.scrollHeight;
    this.wrapperHeight = this.props.itemHeight*5;
  }

  componentWillReceiveProps(nextPros){
     this.scrollHeight =this.props.itemHeight*(nextPros.data.length-1);
     this.selectedIndex = nextPros.selectedIndex||0;
     this.setState({
      offset:0-this.selectedIndex*nextPros.itemHeight,
      data:nextPros.data
    });
  }


  onTouchStart(e){
  	if(StyleSheet.isWeb){
  		 e.preventDefault();
	    e.stopPropagation();
	    e.nativeEvent.stopImmediatePropagation();
  	}
    this.diff = 0;
    this.startTime = (new Date()).valueOf();
    this.startY =getPageY(e);
    this.curOffset = this.state.offset;
    if(this.scrollEngine){
       this.setState({offset:this.scrollEngine.stop()});
    }

    this.props.parent.props.onTouchStart&&this.props.parent.props.onTouchStart(
      {
        e:e,
        columnIndex:this.props.columnIndex,
        columnInstance:this,
        itemHeight:this.props.itemHeight,
        itemIndex:this.getIndexByOffset(this.state.offset)
      }
    );
    this.scrollEngine = null; 
    
  }

  onTouchMove(e){
    if(StyleSheet.isWeb){
  		 e.preventDefault();
	    e.stopPropagation();
	    e.nativeEvent.stopImmediatePropagation();
  	}
    this.curY =getPageY(e);
    this.diff = this.curY - this.startY;
    this.props.parent.props.onTouchMove&&this.props.parent.props.onTouchMove(
      {
        e:e,
        columnIndex:this.props.columnIndex,
        columnInstance:this,
        itemHeight:this.props.itemHeight,
        itemIndex:this.getIndexByOffset(this.state.offset)
      }
    );
    var offset = this.curOffset+this.diff;

    this.setState({
      offset:offset
    });
  }

  onTouchEnd(){

    this.props.parent.props.onTouchEnd&&this.props.parent.props.onTouchEnd(
      {
        columnIndex:this.props.columnIndex,
        columnInstance:this,
        itemHeight:this.props.itemHeight,
        itemIndex:this.getIndexByOffset(this.state.offset)
      }
    );
    if(this.diff===0){
      this.repairDistance();
      return;
    }
    this.diffTime = (new Date()).valueOf()-this.startTime;
    var limt= PlatForm.OS ==='android'?600:300;
    if(this.diffTime>limt){
      this.repairDistance();
      return;
    }

    var tad = this.getCanScrollDistance();
    this.goAuto(tad.len,tad.d);
  }

  goAuto(distance,time){
    var t=0,b=this.state.offset;
      this.scrollEngine = StyleSheet.run(t, b,distance , time);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      },
      StyleSheet.Tween.Sine.easeOut
      ,()=>{
        this.repairDistance();
        this.scrollEngine = null;
      });
  }

  getIndexByOffset(offset){
      var index  = offset/this.props.itemHeight;
      index = (0- Math.round(index));
      index = index<0?0:index;
      index = index>this.state.data.length-1?this.state.data.length-1:index;
      return index;
  }

  repairDistance(){
      var index  = this.getIndexByOffset(this.state.offset);
      var t=0,b=this.state.offset;
      var len = 0-index*this.props.itemHeight-this.state.offset;
      if(Math.abs(len)<=1){
        this.bindNextChildData(index);
        this.triggerTransitionEnd(index);
        return;
      }
      this.scrollEngine = StyleSheet.run(t, b,len,PlatForm.OS==='android'?1:10);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      },null,()=>{
        this.scrollEngine = null;
        this.bindNextChildData(index);
        this.triggerTransitionEnd(index);
      });
  }

  triggerTransitionEnd(index){
    this.props.parent.props.onTansitionEnd&&this.props.parent.props.onTansitionEnd({
          columnIndex:this.props.columnIndex,
          columnInstance:this,
          itemHeight:this.props.itemHeight,
          itemIndex:index
        });
  }

  bindNextChildData(curSelectedIndex){
    if(!this.props.parent.isCascade){
      return;
    }
    if(this.props.columnIndex>=this.props.parent.columnsCount-1){
      return;
    }
    this.selectedIndex = curSelectedIndex;
    var data = this.state.data[curSelectedIndex].children||[];
    var nextKey =this.props.prefix+(this.props.columnIndex+1);
    var nextInstance= this.props.parent.instanceDict[nextKey];
    if(nextInstance){
      nextInstance.bindData(data);
    }
  }

  bindData(data){
    this.selectedIndex = 0;
    this.setState({
      data:data,
      offset:0
    },()=>{
      this.bindNextChildData(0);
    });
    

  }


  getCanScrollDistance(){
    var dAndd = this.getDistanceAndDurtion();
    var maxLen =dAndd.value;
    if(this.state.offset>0){
      return {len:0-this.state.offset,d:dAndd.duration};
    }
    if(this.state.offset<this.bottomLimit){
      return {len:this.bottomLimit-this.state.offset,d:dAndd.duration};
    }
    var len = 0 ;
    if(this.diff>0){
       len = (0-this.state.offset)<=maxLen?(0-this.state.offset):maxLen;
    }
    if(this.diff<0){
      len = (this.bottomLimit-this.state.offset)<(0-maxLen)?(0-maxLen):(this.bottomLimit-this.state.offset);
    }

    return {len:len,d:dAndd.duration};
  }


  getDistanceAndDurtion() {
      var diff_abs = Math.abs(this.diff);
      var duration = 30;
      var value = this.props.itemHeight * 3;
      if (diff_abs >= this.wrapperHeight * 4 / 6) {
          value = this.scrollHeight ;
      }
      else if (diff_abs <= this.wrapperHeight * 4 / 6 && diff_abs >this.wrapperHeight* 3 / 6) {
          value= this.scrollHeight  * 0.8;
          duration =30;
      }
      else if (diff_abs <= this.wrapperHeight * 3 / 6 &&diff_abs > this.wrapperHeight * 2 / 6) {
          value = this.scrollHeight  * 0.6;
          duration = 30;
      }
      else if (diff_abs <= this.wrapperHeight * 2 / 6 &&diff_abs > this.wrapperHeight * 1 / 6) {
          value = this.props.itemHeight  * 3 ;
          duration = 30;
      }
      else {
          // value= this.props.itemHeight*2/3 ;
          // duration = 8;
          value = this.props.itemHeight  * 2;
          duration = 20;
      }

      value = value> this.props.itemHeight *10? this.props.itemHeight *10:value;
      return {value:value,duration:PlatForm.OS==='android'?duration-18:duration+30};
  }
 


  render() {
    var ty = {};
    var child = [];
    for(var i=0,j=this.state.data.length;i<j;i++){
      var itemdata = this.state.data[i];
      child.push(<View style={{alignItems:"center",justifyContent:"center",height:px(this.props.itemHeight)}} key={i}>
      	<Text>
      	{itemdata.label}</Text></View>);
    }
    ty.transform = [{
    	translateY:px(this.props.itemHeight*2+this.state.offset)
    }];
    return (<View style={{flex:1}}><View style={ty} className='xz-selector-col'>
       {child}
      </View></View>);
  }
}

function px(val){
	if(StyleSheet.isWeb){
		return val+"px";
	}
	return val;
}

/*

  position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left:0;
    z-index: 10;
    background: -webkit-linear-gradient(top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, .6) 30%,
    rgba(255, 255, 255, .0) 50%,
    rgba(255, 255, 255, .6) 70%,
    rgba(255, 255, 255, 1) 100%);
   */
class Selector extends Base {
  constructor(props) {
    super(props)
    this.type = props.type||"inline";
    this.preKeyStr = "column_";
    this.hasInit = false;
    this.SelectorColumn = SelectorColumn;
    this.itemHeight = StyleSheet.px2px(75);
    this.instanceDict = {};
    this.isCascade = false;
    if(this.props.cascadeCount){
      if(isNaN(this.props.cascadeCount)){
        console.error("cascadeCount 必须为数字");
      }else{
        this.isCascade = true;
        this.cascadeCount = parseInt(this.props.cascadeCount);
      }
    }
    this.columnsCount = this.cascadeCount||this.props.datasource.length;
    this.selectedIndexs = this._getSelectedIndexs(props);
    this.itemWidth = StyleSheet.screen.width/this.columnsCount;
    this.state = {
      show:props.show
    }
  
  }

  componentWillReceiveProps(nextProps){
    // this.selectedIndexs = this._getSelectedIndexs(nextProps);
    if(this.type==="pop"){
      if(this.state.show!==nextProps.show){
         this.setState({
            show:nextProps.show
          });
      }
    }
  }

  onTouchStart(e){
    var columnIndex = Math.floor(getPageX(e)/this.itemWidth);
    this.curColumnKey = this.preKeyStr+columnIndex;
    this.curColumn = this.instanceDict[this.curColumnKey];
    this.curColumn.onTouchStart(e);
  }

  onTouchMove(e){
     this.curColumn.onTouchMove(e);
  }

  onTouchEnd(){
    this.curColumn.onTouchEnd();
  }

  renderMidArea(){
    if(this.props.renderMidArea){
      return this.props.renderMidArea();
    }
    return null;
  }


  renderContent(){

    var wrapperStyle = {
          position:"relative",
          height:px(this.itemHeight*5),
          display:"flex",
          width:"100%",
          flexDirection:"row",
          backgroundColor:"#fff",
          overflow:"hidden"
    };

    return (
        <View 
        style={wrapperStyle}
        ref={(wrapper)=>{this.wrapper = wrapper;}}
        onTouchStart={this.onTouchStart.bind(this)}
        onTouchMove={this.onTouchMove.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
      >
          <View style={{
            position:"absolute",
            height:px(this.itemHeight),
            borderColor:"#eee",
            borderStyle:"solid",
            borderTopWidth:px(0.5),
            borderBottomWidth:px(.8),
            borderRightWidth:0,
            borderLeftWidth:0,
            width:"100%",
            top:px(this.itemHeight*2)
          }}>{this.renderMidArea()}</View>
          {this.getColumns()}
      </View>);
  }


  render() {
    this.type = this.props.type||"inline";
    if(this.type==="pop"){
      return (<SildeModal
        visible={this.state.show}
        onBackLayerClick={this.props.onBackLayerClick}
        >{
        this.renderContent()
      }</SildeModal>);
    }
    return this.renderContent();
  }
}



export default Selector;
