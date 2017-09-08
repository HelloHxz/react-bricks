import { StackNavigator,NavigationActions } from 'react-navigation';
import React from 'react'



export default (config)=>{

	var pages = {};
	for(var key in config.pages){
		pages[key] = {screen:config.pages[key]};
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