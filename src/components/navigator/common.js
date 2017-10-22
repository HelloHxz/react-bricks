
import React from 'react';
import StyleSheet from '../style';
import View from '../view';
import Text from '../text';
import Easing from '../easing';
import Animated from '../animated';
import PopRoot from './poproot'


export default (Navigator)=>{

	class App extends React.Component {
		constructor(props) {
			super(props);
			global.Toast = this;
		}

		show(config){
			return this.poproot.show(config);
		}

		hide(key){
			this.poproot.hide(key);
		}

		Alert(config){
			return this.poproot.Alert(config);
		}


	  render() {
		return (
			<View className='xz-app-wrapper' style={{flex:1}}>
				 {Navigator}
				 <PopRoot ref={(poproot)=>{
				 	this.poproot = poproot;
				 }}/>
			  </View>
			);
	   }
	}
	return App;
}
