import {observer} from 'mobx-react'
import View from '../view'
import React from 'react'

var PageView =   (WrappedComponent) => {
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
         return <View className='xz-pfull'>
         <WrappedComponent {...this.props} /></View>
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};