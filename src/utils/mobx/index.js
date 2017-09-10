import {observer} from 'mobx-react/native'
import React from 'react'

var connect =  (store) => (WrappedComponent) => {
   return class extends React.Component {
      componentDidMount() {
      	alert("native");
      }
      render() {
         return <WrappedComponent {...this.props} />
      }
   }
}

export {
	observer,connect
};