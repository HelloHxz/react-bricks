
import React from 'react';
import StyleSheet from '../style';
import View from '../view';
import Text from '../text';
import Easing from '../easing';
import Animated from '../animated';


let Styles = StyleSheet.create({
	wrapper:{
		width:"100%",
		height:0,
		left:-1,
		top:-1,
		zIndex:10000,
		position:"absolute"
	}
});

var zIndex = 100000;
var seedkey = 1;
var directionArr = ["top","bottom","center"];
var aimationArr = ["slide","fade"];





class ToastItem extends React.Component{

	constructor(props){
		super(props);
		this.state={
			openValue:new Animated.Value(0)
		}
	}

	componentDidMount(){
		Animated.timing(
	        this.state.openValue,
	        {
	          toValue: 1,
	          duration:200,
	          bounciness: 0, 
	           easing: Easing.linear,
	          restSpeedThreshold: 1
	        }
	      ).start(
	      	()=>{
	      		 setTimeout(()=>{
			    	this.hide();
			    },1800)
	      	}
	      )
	   
	}

	hide(){
		Animated.timing(
	        this.state.openValue,
	        {
	          toValue: 0,
	          duration:300,
	          bounciness: 0, 
	          easing: Easing.linear,
	          restSpeedThreshold: 1
	        }
	      ).start(
	      	()=>{
	      		 delete this.props.parent.Dict[this.props.pkey];
    			 delete this.props.parent.instanceDict[this.props.pkey];
	      	}
	      )
	}

	render(){
		var maxHeight = 300;
		var y = this.state.openValue.interpolate({
	      inputRange: [0,1],
	      outputRange: [StyleSheet._px(-maxHeight), StyleSheet._px(100)],
	      extrapolate: 'clamp',
	    });
		return (
				<Animated.View style={StyleSheet.create({position:"absolute",zIndex:10000,top:0,transform:[{translateY:y}],
					left:'50%'})}>
					<View style={StyleSheet.create({
						paddingLeft:20,paddingRight:20,
					maxWidth:StyleSheet.screen.width-40,maxHeight:maxHeight,minHeight:70,
						display:"flex",justifyContent:"center",alignItems:"center",
					backgroundColor:"#000",opacity:.8,borderRadius:10})}>
						<Text style={{color:"white"}}>{this.props.config.text||""}</Text>
					</View>
				</Animated.View>
			)
	}
}








export default (Navigator)=>{
	class App extends React.Component {
		constructor(props) {
			super(props);
			global.Toast = this;
			this.Dict = {};
			this.instanceDict = {};
			this.state={
				seed:1
			}
		}

		show(config){
			seedkey+=1;
			var key = "toast_"+seedkey;
			this.Dict[key] = <ToastItem ref={(instance)=>{
			  this.instanceDict[key] = instance;
			}} pkey={key} parent={this} config={config} key={key}/>
			this.setState({seed:1});
			return key;
		}

		hide(key){
			var instance = this.instanceDict[key];
			if(instance){
			  instance.hide();
			}
		}

		renderChild(){
			var children = [];
		    for(var key in this.Dict){
		      children.push(this.Dict[key]);
		    }
		    return children;
		}

		  render() {
			return (
				<View  className='xz-app-wrapper' style={{flex:1}}>
					 {Navigator}
					  {this.renderChild()}
				  </View>
				);
		   }
	}
	return App;
}
