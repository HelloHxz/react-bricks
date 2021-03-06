import {View,Text,React,StyleSheet,PageView,Button,Header,TouchableOpacity,Icon,Space,ScrollView,Theme} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';
import AjaxDemoStore from './store';

@PageView
export default class AjaxDemo extends React.Component {
	
  static navigationOptions = {
    header: null
  };

  static connectStore(){
    return {
      ajaxStore:new AjaxDemoStore
    }
  }

  componentDidMount() {
  }

  getMethod(){
    this.props.ajaxStore.getMethod();
  }

  postMethod(){
    this.props.ajaxStore.postMethod();
  }

  onPageBeforeLeave(params){
    if(params.action==="后退"){
      // return false;
    }
    return true;
  }

   goBack(){
    this.props.navigation.goBack();
  }

  render() {
    return ( 
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={{flex:1}}>
        <Space/>
         <Button onPress={this.getMethod.bind(this)} type='flat'>Get</Button>
         <Space/>
         <Button onPress={this.postMethod.bind(this)} type='flat' size='default'>Post</Button>
         <Space/>
         <Button type='flat'>Upload</Button>
         <Space/>
         </ScrollView>
      </View>
    );
  }
}

