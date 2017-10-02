import {View,Text,React,Button,StyleSheet,PageView,Animated,observer,
  UIManager,Icon,Image,Swiper} from "react-bricks"
import Poplayer from './components/poplayer'
import HomeStore from './store'
import HomePopover from './components/homePopover'
import svgs from '../../assets/svg/svgs.js';

var siwperData = [
 {src:require('../../assets/imgs/2.jpg'),title:"xxx"},
 {
   src:require('../../assets/imgs/4.jpg'),title:"xxx",
  },
  {src:require('../../assets/imgs/3.jpg'),title:"xxx"},
  {src:require('../../assets/imgs/1.jpg'),title:"xxx"}
];


var Styles = StyleSheet.create({
  testStyle:{
    width:StyleSheet.baseScreen.width/3,
    height:100,
    backgroundColor_android:"green",
    backgroundColor_ios:"yellow",
  },
  fontStyle:{
    ...{
      backgroundColor:"yellow"
    },
    ...{
      fontSize:32
    }
  }
});

const imgurl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506942039759&di=c09b7da92055a60c4b1cc3f4aad27a61&imgtype=0&src=http%3A%2F%2Fpic7.nipic.com%2F20100504%2F2425919_150716548243_2.jpg";

@observer
@PageView({rootStore:null,homeStore:HomeStore})
class HomeScreen extends React.Component {
  static navigationOptions = {
    // title: 'Welcome',
    header:null
  };

  componentDidMount() {
  }

  constructor(props){
    super(props);
    this.state = {
      anim: new Animated.Value(0),
    }
  }

  renderSwiperItem(params){
    return ( <Image
          resizeMode='contain'
          style={{width:"100%",height:"100%"}}
          source={params.data.src}
        />);
  }



  Nav(e){
    Toast.show({
      text:"hello"
    })
    // UIManager.measure(e.currentTarget,(x, y, width, height, left, top)=>{
    //    this.props.homeStore.popoverConfig = {rect:{
    //     x:x,
    //     y:y,
    //     width:width,
    //     height:height
    //    },dirction:"top"}
    // })
    // this.props.homeStore.popLayerConfig = {key:"some",dirction:"top"}
     // Animated.timing(this.state.anim, {toValue: 300}).start();
    // this.props.navigation.navigate('chat/my', { user: 'Lucy'})
  }
  render() {
    var exS = {backgroundColor:"#fff"};
    return (
      <View style={{flex:1}}>

        <Icon icon={svgs.saoyisao} size='lg'/>
        <Icon icon={svgs.search}/>
        <Icon icon={svgs.home} size='sm'/>
         <Animated.View
          style={{position:"relative",
          transform: [{translateX: this.state.anim}],width:StyleSheet.px(100),height:StyleSheet.px(100),backgroundColor:"green"}}>
        </Animated.View>
        <HomePopover homeStore={this.props.homeStore}/>
        <Poplayer homeStore={this.props.homeStore}/>
        <Button onPress={this.Nav.bind(this)}>Go</Button>
        <Text>asdas</Text>
        <Text style={Styles.fontStyle}><Text>bang!</Text>huxiaozhong</Text>
        <View style={Styles.testStyle}></View>
          <Image
          style={StyleSheet.create({width:100,height:100})}
          source={require('../../assets/imgs/1.jpeg')}
        />
        <Image
          resizeMode='contain'
           style={StyleSheet.create({width:200,height:200})}
          source={{uri:imgurl}}
        />
         <Swiper ref={(instance)=>{this.topswiper = instance;}} 
            style={StyleSheet.create({height:350})}
            lazyrender={false} 
            loop={true} 
            interval={3000} 
            cache={false} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </Swiper>
      </View>
    );
  }
}

export default HomeScreen;