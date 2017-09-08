import ReactDOM from 'react-dom';
import React from 'react';
import "./web/index.less"
import Style from './web/style'
import Navigation from './web/navigation'


export default (config)=>{
		Style._shipei();
	
		ReactDOM.render(<div className='xz-app-wrapper'>
				<Navigation config={config}/>
				</div>,
	   		 document.getElementById('xz-lightapp-root'));
}