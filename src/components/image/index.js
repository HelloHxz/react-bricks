import {Image} from 'react-native'
import React from 'react';


export default class Img extends React.Component{

	render(){
		return <Image {...this.props}/>
	}
}