import {FlatList} from 'react-native';
import React from 'react'
import StyleSheet from '../style'
import { View,PanResponder,UIManager,LayoutAnimation,ScrollView,Text } from 'react-native';
import Base from './base';
import Header from './header'

export default class IOSFlatList extends React.Component{

	constructor(props){
		super(props);
		this.isFirst = true;
		this.state = {
			offset:0,
			refreshState:props.refreshState||"done",// or done loading
		};

	}

	onScroll(e){
		this.offset = (e.nativeEvent.contentOffset.y);
	}

	onTouchEnd(){
		var diffTime = new Date().valueOf() - this.startTime;
		var canRefresh = false;
		canRefresh = this.offset<-StyleSheet._px(130);
		// if(this.isFirst){
		// 	canRefresh = this.offset<-StyleSheet._px(130)&&diffTime>300;
		// }else{
		// 	canRefresh = this.offset<-StyleSheet._px(130);
		// }
		this.isFirst = false;
		if(canRefresh){
			this.header.setLoading();
			setTimeout(()=>{
				this.header.reset();
			},2000)
		}
		
	}

	onTouchStart(){
		this.startTime = new Date().valueOf();
	}



	getHeader(){
		return <Header ref={(c)=>{this.header = c;
		}}/>
	}

	render(){
		console.log("-=-=-=-=-=-==");
		return <FlatList 
				 onTouchStart={this.onTouchStart.bind(this)}
				 onTouchEnd={this.onTouchEnd.bind(this)}
				 ListHeaderComponent={this.getHeader()}
				 ref={(flatlist)=>{this.flatlist = flatlist;}}
				 onScroll = {this.onScroll.bind(this)}
				 {...this.props}/>
	}
}

