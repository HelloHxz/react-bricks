import React from 'react';
import {DatePickerIOS} from 'react-native'
import SlideModal from '../slideModal'

export default class DatePicker extends React.Component{
	constructor(props){
		super(props);
		this.type = props.type||"inline";
		this.state = {
			show:props.show
		}
	}
	componentWillReceiveProps(nextProps){
		if(this.type==="pop"){
			if(this.state.show!==nextProps.show){
				this.setState({
						show:nextProps.show
				});
			}
		}
	}

	render(){
     if(this.type==="pop"){
        return <SlideModal
          onBackLayerClick={this.props.onBackLayerClick}
          visible={this.state.show}
        >{this.renderContent()}
        </SlideModal>
      }
      return this.renderContent();
    }
 
	renderContent(){
		return <DatePickerIOS {...this.props}></DatePickerIOS>
	}
}