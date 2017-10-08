import {View,Text,React,StyleSheet,PageView,Button,Header,TouchableOpacity,Icon,Space,ScrollView} from "react-bricks"
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
      <View style={{flex:1,backgroundColor:"#fff"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={{flex:1}}>
        <Space/>
         <Button>按钮</Button>
<Space/>
         <Button type='hollow' size='lg'>按钮</Button>
         <Space/>
         <Button type='hollow' size='default'>按钮</Button>
         <Space/>
         <Button type='hollow' size='sm'>按钮</Button>
<Space/>
         <Button type='primary' size='lg'>按钮</Button>
         <Space/>
         <Button type='primary' size='default'>按钮</Button>
         <Space/>
         <Button type='primary' size='sm'>按钮</Button>
         <Space/>

         <Button type='text' size='lg'>按钮</Button>
         <Space/>
         <Button type='text' size='default'>按钮</Button>
         <Space/>
         <Button type='text' size='sm'>按钮</Button>
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