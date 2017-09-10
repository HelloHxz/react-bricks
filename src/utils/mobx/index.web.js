import {observer} from 'mobx-react'

import React from 'react'

var connect =  (store) => (WrappedComponent) => {
   return class extends React.Component {
      componentDidMount() {
         console.log(store);
      }
      render() {
         return <WrappedComponent {...this.props} />
      }
   }
}

export {
	observer,connect
};