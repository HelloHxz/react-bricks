import {observer} from 'mobx-react/native'
import React from 'react'

var PageView =  (store) => (WrappedComponent) => {
   class Wrapper extends React.Component {
      static __role = "pageview"
      static navigationOptions = WrappedComponent.navigationOptions;

      componentDidMount() {
      }
      render() {
         var _this = this;
    
         this.props.navigation.replace = function(pagePath,params){
            _this.props.navigation.navigate(pagePath, params||{},"__replace__")
         }
         return <WrappedComponent {...this.props} />
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};