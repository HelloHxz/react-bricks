import {observer} from 'mobx-react/native'
import React from 'react'
import PopRoot from './poproot'
import View from '../view'

var PageView =  (WrappedComponent) => {
   class Wrapper extends React.Component {
      static __role = "pageview"


      static navigationOptions =WrappedComponent.navigationOptions || {
          // title: 'Welcome',
          // gesturesEnabled:false
          header:null,
      };

      componentDidMount() {
      }

      componentWillUnmount(){
         delete global.__bricks__.pageDict[this.pagekey];
         if(global.__bricks__.routeEvents){
            delete global.__bricks__.routeEvents[this.pagekey];
         }
      }

      onPageBeforeLeave(params){
         if(this.pageInstance.onPageBeforeLeave){
            return this.pageInstance.onPageBeforeLeave(params);
         }
         return true;
      }

      constructor(props){
          
         super(props);

         var isInTab = props.isInTab;

         if(isInTab){
            this.pagekey = props.pkey;
         }else{
            this.pagekey = props.navigation.state.key;
         }
         global.__bricks__.pageDict[this.pagekey] = this;

         props.navigation.replace = function(pagePath,params){
             props.navigation.navigate(pagePath, params||{},"__replace__")
         }
         props.navigation.listenRouteChange = function(pageInstance,callBack){
            if(!pageInstance.props.isPage){
               console.error("listenRouteChange 第一个参数必须为页面实例");
            }
            if(!global.__bricks__.routeEvents){
               global.__bricks__.routeEvents = {};
            }
            global.__bricks__.routeEvents[pageInstance.props.pkey] = callBack;
            callBack({
               tabPath:props.navigation.state.routeName+"/"+props.navigation.state.params.__childpage
            });
         }
         this.state={
            params:props.navigation.state.params||{}
         }

         this.store = {};
         if(WrappedComponent.connectStore){
            this.store = WrappedComponent.connectStore();
         }
      }

      tabChange(params){
         this.setState({
            params:params
         });
         const changeCallBack = global.__bricks__.routeEvents[this.pagekey];
         if(changeCallBack){
            try{
               changeCallBack({
                  tabPath:params.__pagename+"/"+params.__childpage
               });
            }catch(e){}
         }
      }

      hidePopPage(pagekey){
         this.poproot.hide(pagekey);
      }

      popPage(children,params){
         return this.poproot.show(children,params);
      }


      render() {
         var _this = this;
       
         return <View style={{flex:1}}>
         <WrappedComponent 
         ref={(pageInstance)=>{
            this.pageInstance = pageInstance;
         }}
         popPage={this.popPage.bind(this)}
         hidePopPage = {this.hidePopPage.bind(this)}
         isPage={true} {...this.props} {...this.store} params={this.state.params} key={this.pagekey} pkey={this.pagekey}/>
         <PopRoot ref={(poproot)=>{this.poproot = poproot;}}/>
         </View>
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};