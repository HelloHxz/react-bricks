import {observer} from 'mobx-react'
import View from '../view'
import React from 'react'
import PopRoot from './poproot'

var PageView =   (WrappedComponent) => {
	class Wrapper extends React.Component {
      static __role = "pageview"
      static connectStore(){
         if(!WrappedComponent.connectStore){
            return {};
         }
         return WrappedComponent.connectStore();
      }

      popPage(pagekey,params){
         this.poproot.show(pagekey,params);
      }

      componentDidMount() {
      }

      render() {
         return <View className='xz-pfull'>
            <WrappedComponent popPage={this.popPage.bind(this)} {...this.props} />
            <PopRoot ref={(poproot)=>{this.poproot = poproot;}}/>
         </View>
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};