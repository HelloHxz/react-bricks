import {observer} from 'mobx-react/native'
import React from 'react'

var PageView =  (WrappedComponent) => {
   class Wrapper extends React.Component {
      static __role = "pageview"

      static navigationOptions = {
          // title: 'Welcome',
          header:null
        };

      componentDidMount() {
      }

      componentWillUnmount(){
         delete global.__bricks__.pageDict[this.pagekey];
         if(global.__bricks__.routeEvents){
            delete global.__bricks__.routeEvents[this.pagekey];
         }
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


      render() {
         var _this = this;
         var store = {};
         if(WrappedComponent.connectStore){
            store = WrappedComponent.connectStore();
         }
         return <WrappedComponent isPage={true} {...this.props} {...store} params={this.state.params} key={this.pagekey} pkey={this.pagekey}/>
      }
   }
   return Wrapper;
}

export {
	observer,PageView
};