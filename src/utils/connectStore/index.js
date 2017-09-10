import React from 'react'
export default (store) => (WrappedComponent) => {
   return class extends React.Component {
      componentDidMount() {
          alert("s2");
      }
      render() {
         return <WrappedComponent {...this.props} />
      }
   }
}