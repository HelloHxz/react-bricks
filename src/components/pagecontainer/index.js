import React from 'react'
import {
  View,Text
} from 'react-native';


class PageContainer extends React.Component {
  componentDidMount() {
  }

  constructor(props){
  	super(props);
  	this.state={
  		pagename:props.params.__childpage
  	}
  }

  componentWillReceiveProps(props){
    // this.prepareRoute(props,(route,ToPageName)=>{
    //   this.dict[ToPageName].setState({leftroute:route,pagename:ToPageName});
    // });
	this.setState({
		pagename:props.params.__childpage
	});
  }

  render() {
    return (
      <View style={{flex:1,height:100,backgroundColor:"red"}}>
      	<Text>{this.state.pagename}</Text>
      </View>
    );
  }
}

export default PageContainer;
