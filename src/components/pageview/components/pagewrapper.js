import React from 'react';
import View from '../../view';
import Text from '../../text';
import Easing from '../../easing';
import Animated from '../../animated';
import Theme from '../../theme'
import StyleSheet from '../../style'
import TouchableWithoutFeedback from '../../touchablewithoutfeedback';
    // var P = global.__bricks__.config.pages[ToPageName.split("_")[0]];
    //   this.arr[ToPageName]=(<P 
    //                 ref={(instance)=>{
    //                   this.dict[ToPageName] = instance;
    //                 }}
    //                 owner = {props.owner}
    //                 isInTab = {true}
    //                 pagename={ToPageName} 
    //                 navigation={props.navigation} 
    //                 key={key} 
    //                 pkey={key}></P>) ;
var AlertStyles = StyleSheet.create({
	wrapper:{
		position:"absolute",
		backgroundColor:"transparent",
		overflow:"hidden",
		zIndex:1000
	},
	wrapper_hide:{
		left:-1000,
		width:0,
		height:0
	},
	wrapper_show:{
		top:0,
		left:0,
		right:0,
		bottom:0,
	},
	bkLayer:{
		position:"absolute",
		top:0,
		left:0,
		right:0,
		bottom:0,
		backgroundColor:"#000",
		overflow:"hidden",
		opacity:(Theme.alert_bk_opacity||Theme.alert_bk_opacity===0)?Theme.alert_bk_opacity:0.3,
		zIndex:1,
	},
	layer:{
		width:"100%",
		height:0,
		backgroundColor:"#fff",
		zIndex:2,
		position:"absolute",
		top:0
	},
	contentWrapper:{position:"absolute",borderRadius:10,width:"100%",height:"100%",zIndex:10,backgroundColor:"#fff"}
});
export default class AlertItem extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			willBeVisible:false,
			openValue: new Animated.Value(0),
		}
	}

	hide(){

	}

	componentDidMount(){
		Animated.spring(
	        this.state.openValue,
	        {
	          toValue: 1,
	          duration:140,
	        }
	      ).start(
	      	
	      )
	}

	bkPress(){
		this.setState({
			willBeVisible:false
		},()=>{
			setTimeout(()=>{
				this.setState({
					willHide:true
				})
				delete this.props.parent.Dict[this.props.pkey];
    			delete this.props.parent.instanceDict[this.props.pkey];
			},300)

		});
	}

	// (
	// 				<TouchableWithoutFeedback key="bk" onPress={this.bkPress.bind(this)} >
	// 	  				<Animated.View style={{...AlertStyles.bkLayer,...{}}}/>
	// 	  			</TouchableWithoutFeedback>
	// 	  		),

	render(){
		if(this.state.willHide){
			return null;
		}
		var children = [];
	
		var drawerTranslateY = this.state.openValue.interpolate({
		    inputRange: [0, 1],
		    outputRange:[StyleSheet._px(StyleSheet.baseScreen.height),0],
		    extrapolate: 'clamp',
		});

		const animateStyle={transform:[{"translateY":drawerTranslateY}]};

		children = <Animated.View 
			key='content' 
			style={{...AlertStyles.contentWrapper,...animateStyle}}
			>
			</Animated.View>;

		return <View style={StyleSheet.create({position:"absolute",flexDirection:"row",top:0,left:0,zIndex:11111,width:StyleSheet.baseScreen.width,height:"100%"})}>
			{children}
		</View>;
	}
}