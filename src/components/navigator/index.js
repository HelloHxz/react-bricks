import { StackNavigator,NavigationActions } from 'react-navigation';
import React from 'react';
import StyleSheet from '../style';
import Common from './common'



function isTabRouteChange(pageArr,state){
	var curRoute = state.routes[state.routes.length-1];
	return pageArr[0]===curRoute.routeName&&curRoute.params&&curRoute.params.__childpage;
}


let preTime =null;

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

	var initialRouteParams = {};
	if(!config.root){
		console.error("未设置启动页root配置");
	}
	var rootArr = config.root.split("/");
	if(rootArr.length===2){
		initialRouteParams.__childpage = rootArr[1];
	}
	var AppNavigator = StackNavigator(pages,{
		initialRouteName:rootArr[0],
		initialRouteParams:initialRouteParams
	});

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

	  var now = new Date().valueOf();
	  if(now-preTime<1000&&action.type!=="Navigation/INIT"&&preTime){
	  	//解决快速点击跳出两个页面
	  	return null;
	  }

	  if(action.type!=="Navigation/INIT"){
	 	 preTime = now;
	  }


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

	constructor(props) {
		super(props);
		global.Toast = this;
		this.Dict = {};
		this.instanceDict = {};
		this.state={
			seed:1
		}
	}

	show(config){
		seedkey+=1;
		var key = "toast_"+seedkey;
		this.Dict[key] = <ToastItem ref={(instance)=>{
		  this.instanceDict[key] = instance;
		}} pkey={key} parent={this} config={config} key={key}/>
		this.setState({seed:1});
		return key;
	}

	hide(key){
		var instance = this.instanceDict[key];
		if(instance){
		  instance.hide();
		}
	}

	renderChild(){
		var children = [];
	    for(var key in this.Dict){
	      children.push(this.Dict[key]);
	    }
	    return children;
	}

	  render() {
		return (
			<View style={{flex:1}}>
				 <AppNavigator />
				  {this.renderChild()}
			  </View>
			);
	   }
	}




	return Common(<AppNavigator />,config);
}