import React from 'react'
import StyleSheet from '../style'
import { View,PanResponder,UIManager,LayoutAnimation,ScrollView,Text } from 'react-native';

export default class AndroidHeader extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			offset:0,
			refreshState:props.refreshState||"done",// or done loading
		};

    }
    
    setLoading(){
        this.indicatorWrapper.setNativeProps({
            style:{
                marginTop:0
            }
        });
    }

    reset(){
        this.indicatorWrapper.setNativeProps({
            style:{
                marginTop:-this.props.height
            }
        });
    }

	render(){
        return <View>
            <View ref={(c)=>{this.indicatorWrapper=c;}} style={{height:this.props.height,marginTop:-this.props.height,backgroundColor:"red"}}></View>
            <View style={StyleSheet.create({height:200,backgroundColor:"yellow"})}/>
        </View>
	}
}

