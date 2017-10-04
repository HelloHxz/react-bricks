import {View,Text,React,Button,StyleSheet,PageView,Animated,observer,
  FlatList,
  TouchableOpacity,
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



var ListDataSource = [
  {id:0,name:"Button",url:"buttonDemo"},
  {id:1,name:"Icon",url:"iconDemo"},
  {id:2,name:"Image",url:"imageDemo"},
  {id:3,name:"Swiper",url:"swiperDemo"},
  {id:4,name:"Popover",url:"popoverDemo"},
  {id:5,name:"Poplayer",url:null},
  {id:6,name:"xxx",url:null},
  {id:7,name:"xxx",url:null},
  {id:8,name:"xxx",url:null},
  {id:9,name:"xxx",url:null},
  {id:10,name:"xxx",url:null},
  {id:11,name:"xxx",url:null},
  {id:12,name:"xxx",url:null},
  {id:13,name:"xxx",url:null},
  {id:14,name:"xxx",url:null},
  {id:15,name:"xxx",url:null},
  {id:16,name:"xxx",url:null},
  {id:17,name:"xxx",url:null},
  {id:18,name:"xxx",url:null},
  {id:19,name:"xxx",url:null},
  {id:20,name:"xxx",url:null},
  {id:21,name:"xxx",url:null},
  {id:22,name:"xxx",url:null},
  {id:23,name:"xxx",url:null},
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
          resizeMode='cover'
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

  listRowPress(item){
    if(item.url){
      this.props.navigation.navigate(item.url, { user: 'Lucy'})
    }
  }

  listRenderItem({item}){
    return <TouchableOpacity 
      onPress = {this.listRowPress.bind(this,item)}
    style={StyleSheet.create({height:70})}><Text>{item.name}</Text></TouchableOpacity>
  }

  _keyExtractor = (item, index) => item.id;

  render() {

    return <FlatList
      data={ListDataSource}
      renderItem={this.listRenderItem.bind(this)}
      keyExtractor={this._keyExtractor}
    />

    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>

         <Animated.View
          style={{position:"relative",
          transform: [{translateX: this.state.anim}],width:StyleSheet.px(100),height:StyleSheet.px(100),backgroundColor:"green"}}>
        </Animated.View>
        <HomePopover homeStore={this.props.homeStore}/>
        <Poplayer homeStore={this.props.homeStore}/>
        <Button onPress={this.Nav.bind(this)}>Go</Button>
          <Image
          style={StyleSheet.create({width:100,height:100})}
          source={require('../../assets/imgs/1.jpeg')}
        />
        <Text>asdas</Text>
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
            cache={true} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </Swiper>
        <Text style={Styles.fontStyle}><Text>bang!</Text>huxiaozhong</Text>
        <View style={Styles.testStyle}></View>

      </View>
    );
  }
}

export default HomeScreen;