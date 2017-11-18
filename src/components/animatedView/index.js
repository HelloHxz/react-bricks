import Animated from '../animated';
import View from '../view';
import StyleSheet from '../style';
import React from 'react';
import Easing from '../easing'

/*
    <AnimateView
        config={[
            {opacity:.4,height:0},
            {opacity:1,height:300}
        ]}
        state={0}
    >
        ....
    </AnimatedView>

*/

export default class AnimatedView extends React.Component{

    constructor(props){
        super(props);
        this.config = props.config;
        this.preValue = this._processStateValue(props.state);
        this.state={
            stateValue:new Animated.Value(this.preValue)
        }
    }

    _processStateValue(val){
        var re = val;
        if(!val||isNaN(val)||val>10||val>=this.config.length){
            re = 0;
        }else{
            re = parseInt(val)/10;
        }
        return re;
    }

    componentWillReceiveProps(nextProps){
        var nextStateValue =this._processStateValue(nextProps.state);
        if(nextStateValue===this.state.stateValue._value){
            return;
        }
        this.curValue = nextStateValue;
        Animated.timing(
            this.state.stateValue,
            {
              toValue: nextStateValue,
              duration:250,
              bounciness: 0, 
              easing:Easing.ease,
              restSpeedThreshold: 1
            }
          ).start(()=>{
              this.preValue = this.curValue;
          })
    }

    _getValueByKey(key,val){
        if(key==='opacity'){
            return val;
        }
        return StyleSheet._px(val);
    }

    render(){
        var preValue = this.preValue;
        var curValue = this.curValue||0;
        var preStyle = this.config[preValue*10];
        var curStyle = this.config[curValue*10];
        var animatedStyle = {};
        for(var key in preStyle){
            var inputRange = [];
            var outputRange = [];
            if(preValue<curValue){
                inputRange=[preValue,curValue];
                outputRange =  [ this._getValueByKey(key,preStyle[key]),  this._getValueByKey(key,curStyle[key])];
            }else{
                inputRange=[curValue,preValue];
                outputRange =  [  this._getValueByKey(key,curStyle[key]),this._getValueByKey(key,preStyle[key])];
            }
            animatedStyle[key] = this.state.stateValue.interpolate({
                inputRange:inputRange ,
                outputRange:outputRange,
                extrapolate: 'clamp',
            });
        }
        var propsStyle = this.props.style||{};
        var style = {...propsStyle,...animatedStyle};
        return <Animated.View 
            style={style}>
            {this.props.children}
        </Animated.View>
    }
}