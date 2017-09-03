import { StackNavigator } from 'react-navigation';


export default (config)=>{
	var pages = {};
	for(var key in config.pages){
		pages[key] = {screen:config.pages[key]};
	}
	return StackNavigator(pages);
}