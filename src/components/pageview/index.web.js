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

      popPage(children,params){
         return this.poproot.show(children,params);
      }

      onPageResume(){

      }

       hidePopPage(pagekey){
         this.poproot.hide(pagekey);
      }

      onPageBeforeLeave(params){
         if(this.pageInstance.onPageBeforeLeave){
            return this.pageInstance.onPageBeforeLeave(params);
         }
         return true;
      }

      componentDidMount() {
      }

      render() {
         return <View className='xz-pfull'>
            <WrappedComponent ref={(pageInstance)=>{this.pageInstance = pageInstance;}} 
            hidePopPage = {this.hidePopPage.bind(this)}
            popPage={this.popPage.bind(this)} {...this.props} />
            <PopRoot ref={(poproot)=>{this.poproot = poproot;}}/>
         </View>
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};