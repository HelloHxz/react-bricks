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
        <Button style={StyleSheet.create({width:100})} onPress={this.testClick.bind(this,1)}>State 1</Button>
        <Button style={StyleSheet.create({width:100})} onPress={this.testClick.bind(this,2)}>State 2</Button>
        <Button style={StyleSheet.create({width:100})} onPress={this.testClick.bind(this,3)}>State 3</Button>
        <Button style={StyleSheet.create({width:100})} onPress={this.testClick.bind(this,4)}>State 4</Button>
        <AnimatedView 
          animateType={{}}
          config={[
            {opacity:.2,height:0},
            {opacity:.3,height:300},
            {opacity:.7,height:200},
            {opacity:.5,height:100},
        ]}
        style={{backgroundColor:"red"}} state={this.state.state}/>
        </ScrollView>
      </View>
    );
  }
}

