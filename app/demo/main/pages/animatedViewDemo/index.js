import {View,Text,React,StyleSheet,AnimatedView,PageView,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Grid,Space,Easing} from "react-bricks"



@PageView
export default class AnimatedDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }

  constructor(props){
    super(props);
    this.state = {
      state:0
    }
  }

  testClick(state){
    this.setState({
      state:state
    });
  }


  goBack(){
    this.props.navigation.goBack();
  }

  render() {
    return (
       <View style={{flex:1,backgroundColor:"#f2f3f4"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}>
            <Icon icon={Icon.DemoIcons.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={{flex:1}}>
        <Space/>
        <Button style={StyleSheet.create({width:100})} onPress={this.testClick.bind(this,0)}>State 1</Button>
        <Button style={StyleSheet.create({width:100})} onPress={this.testClick.bind(this,1)}>State 2</Button>
        <Button style={StyleSheet.create({width:100})} onPress={this.testClick.bind(this,2)}>State 3</Button>
        <Button style={StyleSheet.create({width:100})} onPress={this.testClick.bind(this,3)}>State 4</Button>
        <AnimatedView 
          animateType={{}}
          config={[
            {opacity:.2,height:0,scale:0,translateX:0,translateY:0,rotate:0,},
            {opacity:.3,height:300,scale:.4,translateX:30,translateY:40,rotate:40,},
            {opacity:.7,height:200,scale:1,translateX:80,translateY:160,rotate:90,},
            {opacity:.5,height:100,scale:2,translateX:100,translateY:220,rotate:180,},
        ]}
        style={{backgroundColor:"red"}} state={this.state.state}/>
        </ScrollView>
      </View>
    );
  }
}

