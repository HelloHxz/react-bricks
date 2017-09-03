import ReactDOM from 'react-dom';
import React from 'react';
import "./web.less"
import Style from './web/style'



export default (config)=>{
	Style._shipei();
	var P = config.pages.Home;
	ReactDOM.render(<div className='xz-app-wrapper'>
				<P/>
			</div>,
   		 document.getElementById('xz-lightapp-root'));
}