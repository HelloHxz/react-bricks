
import React from 'react';
import View from '../view'
import ScrollView from '../scrollview'

export default class FlatList extends React.Component{

	constructor(props){
		super(props);
		this.state={
			data:props.data||[]
		}
	}

	componentWillReceiveProps(nextProps){

	}

	render(){
		var rows = [];
		var datasource = this.props.data||[];
		for(var i=0,j=datasource.length;i<j;i++){
			var item = datasource[i];
			rows.push(<View key={this.props.keyExtractor(item,i)}>{
				this.props.renderItem({
					item:item
				})
			}</View>);
		}
		return <ScrollView {...this.props} onRefresh={()=>{}}>{rows}</ScrollView>
	}
} 