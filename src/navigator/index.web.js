import ReactDOM from 'react-dom';
import React from 'react';
import "./web/index.less"
import Navigation from './web'
import ToastManager from '../components/toast'


export default (config)=>{
	for(var key in config.pages){
		var pageClass = config.pages[key];
		if(pageClass.__role!=='pageview'){
			console.error("页面"+key+"没有使用@PageView装饰器进行声明装饰");
			return;
		}
		pageClass.__pagename = key;
	}
	ReactDOM.render(
			<div className='xz-app-wrapper'>
				<ToastManager/>
				<Navigation config={config}/>
			</div>,
		document.getElementById('xz-lightapp-root'));
}