/* eslint-disable eol-last */
import { Icon } from 'antd-mobile';
import React from 'react';

class Com extends React.Component{
  render(){
    let type = "";
    if(this.props.type.default){
      type = this.props.type.default.id;
    }else{
      type = this.props.type;
    }
    return <Icon {...this.props} type={type}/>
  }
}
export default Com;