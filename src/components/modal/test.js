import React, { Component } from 'react';

import  {
  StyleSheet,
  Text,View,Image,Modal,
  TouchableOpacity,Easing,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import Base from './Base';



import Immutable from 'immutable';
import * as Helper from '../common/utils';

import * as StyleHelper from '../common/styleHelper';



const styles = StyleSheet.create({
  defaultLayoutStyle:  {
  zIndex:1000,
  right:0,
  backgroundColor:"white",
  bottom:0,
  left:0,
  position:"absolute",
},
  overlay:  {
    backgroundColor: '#000',
    flex:1
} 
});


class poplayout extends Base {
  constructor(props) {
    super(props)
    props.page_view.extendsRefs["poplayout_"+props.com_ref] = this;
    this.state = {
      openValue: new Animated.Value(0),
      visible:true
    }
  }
  onShow(){
      Animated.timing(
        this.state.openValue,
        {
          toValue: 1,
          duration:280,
          bounciness: 0, 
          easing:Easing.in(),
          restSpeedThreshold: 0.1
        }
      ).start()
  }

  show(){
    this.setState({visible:true});
  }

  hide(){
    Animated.timing(
        this.state.openValue,
        {
          toValue: 0,
          bounciness: 0, 
          duration:280,
          easing:Easing.in(),  
          restSpeedThreshold: 1
        }
      ).start(()=>{
        this.setState({visible:false});
      })
  }

  baseRender() {
    const popHeight = 230;
    const {
      openValue
    } = this.state;
  
      const drawerTranslateY = openValue.interpolate({
        inputRange: [0, 1],
        outputRange:[popHeight,0],
        extrapolate: 'clamp',
      });
 
    var animateStyle={transform:[{"translateY":drawerTranslateY}],height:popHeight};

    const overlayOpacity = openValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.15],
      extrapolate: 'clamp',
    });

    const animatedOverlayStyles = { opacity: overlayOpacity };
      return (
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.visible}
          onShow = {()=>{
            this.onShow();
          }}
          >
          <TouchableWithoutFeedback
            onPress = {()=>{
              this.hide()
            }}
          ><Animated.View 
            style={[styles.overlay,animatedOverlayStyles]}>
            </Animated.View></TouchableWithoutFeedback>
        <Animated.View 
          style={[styles.defaultLayoutStyle,animateStyle]}
          >
          {
          Helper.getLayout({
            root:this.config.root,
            pageInstance :this.props.page_view,
            rowInstance:null})
          }
        </Animated.View></Modal>);
  }
}
module.exports = poplayout;
