import StyleSheet from '../style';
import React from 'react';
import PlatForm from '../platform'
import View from '../view'

var defaultStyle = StyleSheet.create({
    height:38,
    backgroundColor:"#fff",
    width:"100%"
})
export default class IosHeaderPlaceHolder extends React.Component{
    render(){
        if(PlatForm.OS==='ios'){
            return <View style={{...defaultStyle,...(this.props.style||{})}}/>
        }
        return null;
    }
}