import {observer} from 'mobx-react/native'
import React from 'react'

var PageView =  (store) => (WrappedComponent) => {
   class Wrapper extends React.Component {
      static __role = "pageview"
      static navigationOptions = WrappedComponent.navigationOptions;

      componentDidMount() {
      }

      componentWillUnmount(){
         delete global.__bricks__.pageDict[this.pagekey];
      }

      constructor(props){
         super(props);

         var isInTab = props.isInTab;
         if(isInTab){
            this.pagekey = props.pkey;
         }else{
            this.pagekey = props.navigation.state.key;
         }
         global.__bricks__.pageDict[this.pagekey] = this;

         props.navigation.replace = function(pagePath,params){
             props.navigation.navigate(pagePath, params||{},"__replace__")
         }
         props.navigation.listenRouteChange = function(pageInstance,callBack){
            
         }
         this.state={
            params:props.navigation.state.params||{}
         }
      }

      tabChange(params){
         this.setState({
            params:params
         });
      }

      render() {
         var _this = this;
         return <WrappedComponent {...this.props} {...store} params={this.state.params} pkey={this.pagekey}/>
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};