import {observer} from 'mobx-react'

import React from 'react'

var PageView =  (store) => (WrappedComponent) => {
   return class extends React.Component {
   	  static __role = "pageview"
      componentDidMount() {
      }
      render() {
         return <WrappedComponent {...this.props} />
      }
   }
}

export {
	observer,PageView
};