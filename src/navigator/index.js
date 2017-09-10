import { StackNavigator,NavigationActions } from 'react-navigation';
import React from 'react'

export default (config)=>{
	var pages = {};
	for(var key in config.pages){
		var pageClass = config.pages[key];
		pages[key] = {screen:pageClass};
		if(pageClass.__role!=='pageview'){
			console.error("页面"+key+"没有使用@PageView装饰器进行声明装饰");
		}
	}
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
	  console.log(action);
	  console.log(state);
	  return defaultGetStateForAction(action, state);
	};


	class App extends React.Component {

	  onNav(prevState, newState, action){

	  }

	  render() {
		return (
		  <AppNavigator 
			  onNavigationStateChange = {this.onNav.bind(this)}
			  ref={nav => { this.navigator = nav; }} />
			);
	   }
	}
	return App;
}