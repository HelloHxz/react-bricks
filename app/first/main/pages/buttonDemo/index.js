import {View,Text,React,StyleSheet,PageView,Button,Header,TouchableOpacity,Icon,Space,ScrollView,Theme} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';

@PageView({rootStore:null,homeStore:null})
class ButtonDemo extends React.Component {
	
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
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
         <Button type='hollow' size='lg'>按钮</Button>
         <Space/>
         <Button type='hollow' size='default'>按钮</Button>
         <Space/>
         <Button type='hollow' size='sm'>按钮</Button>
<Space/>
       <Button type='hollow' circle={true} size='lg'>按钮</Button>
         <Space/>
       <Button type='primary' circle={true} size='lg'>按钮</Button>
          <Space/>

        <Button type='primary' circle={true} size='lg'><Icon style={{color:"#fff"}} icon={svgs.search}/></Button>
<Space/>

        <Button type='primary' circle={true} size='sm'><Icon style={{color:"#fff"}} size="sm" icon={svgs.search}/></Button>
<Space/>
         <Button type='primary' size='lg'>按钮</Button>
         <Space/>
         <Button style={StyleSheet.create({width:120})} type='primary' size='default'>按钮</Button>
         <Space/>
         <Button type='primary' size='sm'>按钮</Button>
         <Space/>

         <Button type='text' size='lg'>按钮</Button>
         <Space/>
         <Button type='text' size='default'>按钮</Button>
         <Space/>
         <Button style={StyleSheet.create({width:120})} type='text' size='sm'>按钮</Button>
         <Space/>

         <Button type='hollow' size='lg'><Icon size="sm" icon={svgs.search}/><Text style={StyleSheet.create({marginLeft:10,fontSize:26})}>搜索</Text></Button>
         <Space/>
         

         <Button type='flat' size='lg'>按钮</Button>
         <Space/>
         <Button type='flat' size='default'>按钮</Button>
         <Space/>
         <Button type='flat' size='sm'>按钮</Button>
         <Space/>
         </ScrollView>
      </View>
    );
  }
}

export default ButtonDemo;