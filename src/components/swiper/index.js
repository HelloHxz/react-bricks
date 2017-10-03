import View from '../view';
import Text from '../text';
import React from 'react';
import { ScrollView } from 'react-native'
import StyleSheet from '../style';

class Swiper extends React.Component{

	constructor(props){
		super(props);
	
	    this.init(props,false);
	    this.animate = false;
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
  	this.direction = props.direction||"horizontal";
	if(["horizontal","vertical"].indexOf(this.direction)<0){
		this.direction = "horizontal";
	}
	this.horizontal = this.direction==="horizontal";
	this.ScrollPosition = null;

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
    // this.setState({offset:step*(0-this.WrapperSizeValue-this.space)});
    // this.goNextTimeoutID = setTimeout(()=>{
    //   this.animate = false;
    //   for(var i=0;i<step;i++){
    //     this.getNextWraperArr();
    //     this.getNextSourceArr();
    //   }
    //   this.setIsInTransitionFalse();
    //   this.setState({offset:0});
    //   this.startInterval();
    // },310)
  }

  goPreByStep(step){
    this.animate = true;  
    this.isIntransition = true;
    // this.setState({offset:step*(this.WrapperSizeValue+this.space)});
    // setTimeout(()=>{
    //   this.animate = false;
    //   for(var i=0;i<step;i++){
    //     this.getPreWraperArr();
    //     this.getPreSourceArr();
    //   }
    //   this.setIsInTransitionFalse();
    //   this.setState({offset:0});
    //   this.startInterval();
    // },310)
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

  setEnable(){
      setTimeout(()=>{
        this.setIsInTransitionFalse();
        this.startInterval();
      },300);
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


	onMomentumScrollEnd(e){
		// if(this.ScrollPosition.x ===0){
			// this.scroll.scrollTo({x:StyleSheet.screen.originWidth,y:0,animated:false});
		// }
	}

	onScroll(e){
		this.ScrollPosition = e.nativeEvent.contentOffset;
	}

	render(){
		var style = this.props.style||{};
		var children = [];
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


	        children.push(<View style={{width:StyleSheet.screen.originWidth,height:"100%"}} key={key}>
	          {this._renderItem({index:i})}
	        </View>);
    	}


		return (<View style={style}>
			<ScrollView
			 ref={(scroll)=>{
			 	this.scroll = scroll;
			 }}
			 scrollEventThrottle={20}
			 onScroll={this.onScroll.bind(this)}
			 onMomentumScrollEnd = {this.onMomentumScrollEnd.bind(this)}
			 showsHorizontalScrollIndicator={false} pagingEnabled={true} horizontal={this.horizontal}>
				{children}
			</ScrollView>
		</View>)
	
	}
}

export default Swiper;