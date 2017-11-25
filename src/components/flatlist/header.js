import {FlatList} from 'react-native';
import React from 'react'
import StyleSheet from '../style'
import { View,PanResponder,UIManager,LayoutAnimation,ScrollView,Text } from 'react-native';

export default class IOSFlatList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			offset:0,
			refreshState:props.refreshState||"done",// or done loading
		};

    }
    
    setLoading(){
        this.indicatorWrapper.setNativeProps({
            style:StyleSheet.create({
                marginTop:0
            })
        });
    }

    reset(){
        this.indicatorWrapper.setNativeProps({
            style:StyleSheet.create({
                marginTop:-130
            })
        });
    }

	render(){
        return <View>
            <View ref={(c)=>{this.indicatorWrapper=c;}} style={StyleSheet.create({height:130,marginTop:-130,backgroundColor:"red"})}></View>
            <View style={StyleSheet.create({height:200,backgroundColor:"yellow"})}/>
        </View>
	}
}

