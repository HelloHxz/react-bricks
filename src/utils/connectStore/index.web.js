import React from 'react'
export default (store) => (WrappedComponent) => {
   return class extends React.Component {
      componentDidMount() {
         console.log(store);
      }
      render() {
         return <WrappedComponent {...this.props} />
      }
   }
}