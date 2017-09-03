import ReactDOM from 'react-dom';
import React from 'react';



export default (config)=>{
	var P = config.pages.Home;
	ReactDOM.render(<div className='xz-app-wrapper'>
				<P/>
			</div>,
   		 document.getElementById('xz-lightapp-root'));
}