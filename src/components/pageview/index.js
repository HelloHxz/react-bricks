import {observer} from 'mobx-react/native'
import React from 'react'

var PageView =  (store) => (WrappedComponent) => {
   class Wrapper extends React.Component {
      static __role = "pageview"
      static navigationOptions = WrappedComponent.navigationOptions;

      componentDidMount() {
      }

      constructor(props){
         super(props);
         var pagekey = props.navigation.state.key;

         var isInTab = props.isInTab;
         if(!isInTab){
            global.__bricks__.pageDict[pagekey] = this;
         }
          props.navigation.replace = function(pagePath,params){
             props.navigation.navigate(pagePath, params||{},"__replace__")
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
    
        
         return <WrappedComponent {...this.props} params={this.state.params}/>
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};