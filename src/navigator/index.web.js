import ReactDOM from 'react-dom';
import React from 'react';
import "./web/index.less"
import Navigation from './web/navigation'

export default (config)=>{
		ReactDOM.render(<div className='xz-app-wrapper'>
				<Navigation config={config}/>
				</div>,
	   		 document.getElementById('xz-lightapp-root'));
}