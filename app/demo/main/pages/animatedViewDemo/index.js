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

    var config =[
    {opacity:.2,height:0,translateX:0,translateY:0,rotate:0,scale:0},
    {opacity:.3,height:300,translateX:30,translateY:40,rotate:40,scale:.4,},
    {opacity:.7,height:200,translateX:80,translateY:160,rotate:90,scale:1},
    {opacity:.5,height:100,translateX:100,translateY:220,rotate:180,scale:2},
];
  /* 不同平台的效果需要兼容性处理 */
  if(StyleSheet.isWeb){
    config =[
      {opacity:.2,height:0,scale:0,rotate:0,translateX:0,translateY:0},
      {opacity:.3,height:300,scale:.4,rotate:40,translateX:30,translateY:40,},
      {opacity:.7,height:200,scale:1,rotate:90,translateX:80,translateY:160,},
      {opacity:.5,height:100,scale:2,rotate:180,translateX:100,translateY:220,},
  ];
  }
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
        <Text style={StyleSheet.create({fontSize:23,color:"#333"})}> 
      rotate,scale 和 translateX，translateY混用导致web和native的兼容性问题
      可以在IOS，Android调整rotate的顺序解决 控件源码还没解决,一般别混用,一定要混用的话，
      这个可以调用的时候传config的时候根据平台不同传入
        </Text>
        
        <AnimatedView 
          animateType={{}}
          config={config}
        style={{backgroundColor:"red"}} state={this.state.state}/>
        <Space/>
     
        </ScrollView>
      </View>
    );
  }
}

