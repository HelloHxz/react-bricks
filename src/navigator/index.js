import { StackNavigator,NavigationActions } from 'react-navigation';
import React from 'react';
import { View } from 'react-native'


function isTabRouteChange(pageArr,state){
	var curRoute = state.routes[state.routes.length-1];
	return pageArr[0]===curRoute.routeName&&curRoute.params&&curRoute.params.__childpage;
}

export default (config)=>{
	var pages = {};
	for(var key in config.pages){
		var pageClass = config.pages[key];
		pages[key] = {screen:pageClass};
		if(pageClass.__role!=='pageview'){
			console.error("页面"+key+"没有使用@PageView装饰器进行声明装饰");
		}
		pageClass.__pagename = key;
	}
	global.__bricks__ = {
		config:config,
		pageDict:{}
	};
	var AppNavigator = StackNavigator(pages);

	const defaultGetStateForAction = AppNavigator.router.getStateForAction;

	AppNavigator.router.getStateForAction = (action, state) => {
	  // if (
	  //   state &&
	  //   action.type === NavigationActions.BACK &&
	  //   state.routes[state.index].params.isEditing
	  // ) {
	  //   // Returning null from getStateForAction means that the action
	  //   // has been handled/blocked, but there is not a new state
	  //   return null;
	  // }
	  var params = action.params || {};
	  var pageName =  action.routeName||"";
	  var pageArr = pageName.split("/");
	  params.__pagename = pageArr[0];

	  if(action.type==="Navigation/NAVIGATE"){
		

		var len = pageArr.length;
		if(len>2){
			console.error("页面层级最多两层");
		}
		if(len===2){
			action.routeName = pageArr[0];
			params.__childpage = pageArr[1];
			action.params = params;
			var lastKey = state.routes[state.routes.length-1].key;
			var pageInstance = global.__bricks__.pageDict[lastKey];
			if(isTabRouteChange(pageArr,state)){
				//页面内部进行状态改变 改变PageContainer  global.__bricks__.pageDict
				if(pageInstance){
					pageInstance.tabChange(action.params);
				}
				return null;
			}else{
				if(pageInstance){
				}
			}
		}
	  }

	  action.params = params;

	  if(action.action==="__replace__"){
	  	const routes = state.routes.slice(0, state.routes.length - 1);
	      routes.push(action);
	      return {
	        ...state,
	        routes,
	        index: routes.length - 1,
	      };
	  }

	  var Re = defaultGetStateForAction(action, state);

	  return Re;
	};

	/*
		todo global popPage 
	*/
	class App extends React.Component {
		//<View style={{width:"100%",height:"100%",backgroundColor:"yellow",zIndex:222,position:"absolute",top:0,left:0}}></View>
	  render() {
		return (
			<View style={{flex:1}}>
				 <AppNavigator 
				 style={{zIndex:10}}
				  ref={nav => { this.navigator = nav; }}/>
			  </View>
			);
	   }
	}
	return App;
}