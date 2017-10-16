import {observer} from 'mobx-react'

import React from 'react'

var PageView =  (store) => (WrappedComponent) => {
	class Wrapper extends React.Component {
      static __role = "pageview"
      static connectStore(){
         return store;
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