import {observer} from 'mobx-react'

import React from 'react'

var PageView =  () => (WrappedComponent) => {
	class Wrapper extends React.Component {
      static __role = "pageview"
      static connectStore(){
         if(!WrappedComponent.connectStore){
            return {};
         }
         return WrappedComponent.connectStore();
      }
      componentDidMount() {
      }
      render() {
         return <WrappedComponent {...this.props} />
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};