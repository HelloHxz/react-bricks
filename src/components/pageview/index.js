import {observer} from 'mobx-react/native'
import React from 'react'

var PageView =  (store) => (WrappedComponent) => {
   return class extends React.Component {
      static __role = "pageview"
      render() {
         return <WrappedComponent {...this.props} />
      }
   }
}

export {
	observer,PageView
};