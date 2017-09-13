import {observer} from 'mobx-react/native'
import React from 'react'

var PageView =  (store) => (WrappedComponent) => {
   class Wrapper extends React.Component {
   	  static __role = "pageview"
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