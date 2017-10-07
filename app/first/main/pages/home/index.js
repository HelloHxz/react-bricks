import {View,Text,React,Button,StyleSheet,PageView,Animated,observer,
  FlatList,Header,
  TouchableOpacity,ActivityIndicator,
  UIManager,Icon,Image,Swiper} from "react-bricks"
import Poplayer from './components/poplayer'
import HomeStore from './store'
import HomePopover from './components/homePopover'


var ListDataSource = [
  {id:7,name:"View",url:null},
  {id:8,name:"Text",url:null},
  {id:0,name:"Button",url:"buttonDemo"},
  {id:1,name:"Icon",url:"iconDemo"},
  {id:2,name:"Image",url:"imageDemo"},
  {id:3,name:"Swiper",url:"swiperDemo"},
  {id:4,name:"Popover",url:"popoverDemo"},
  {id:5,name:"Poplayer",url:"poplayerDemo"},
  {id:6,name:"Toast",url:null},
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
  {id:24,name:"xxx",url:null},
  {id:25,name:"xxx",url:null},
  {id:26,name:"xxx",url:null},
  {id:27,name:"xxx",url:null},
  {id:28,name:"xxx",url:null},
  {id:29,name:"xxx",url:null},
  {id:30,name:"xxx",url:null},
  {id:31,name:"xxx",url:null},
  {id:32,name:"xxx",url:null},
  {id:33,name:"xxx",url:null},
  {id:34,name:"xxx",url:null},
  {id:35,name:"xxx",url:null},
  {id:36,name:"xxx",url:null},
  {id:37,name:"xxx",url:null},
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
  }

  renderSwiperItem(params){
    return ( <Image
          resizeMode='cover'
          style={{width:"100%",height:"100%"}}
          source={params.data.src}
        ></Image>);
  }


  listRowPress(item){
    if(item.url){
      this.props.navigation.navigate(item.url, { user: 'Lucy'})
    }else{
       Toast.show({
        text:"hello"
      })
    }
  }


  renderPullIndicator(params){
    var child = null;
    if(params.isInLoading){
      child = <ActivityIndicator/>;
    }else{
      var text = params.canRefresh?"释放更新gaa":"下拉刷新hah";
      child = <Text>{text}</Text>;
    }
     return <View style={{height:"100%",width:"100%",backgroundColor:"#fff",justifyContent:"center",overflow:"hidden",alignItems:"center"}}>
      {child}
    </View>
  }


  listRenderItem({item}){
      return  <TouchableOpacity 
    style={StyleSheet.create({height:110,display:"flex",flexDirection:"row",alignItems:"center"})}
      onPress = {this.listRowPress.bind(this,item)}>
       <Text>{item.name}</Text>
      </TouchableOpacity>
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return <View style={{flex:1}}>
      <Header></Header>
      <FlatList
        style={{backgroundColor:"#fff"}}
        renderPullIndicator = {this.renderPullIndicator.bind(this)}
        data={ListDataSource}
        renderItem={this.listRenderItem.bind(this)}
        keyExtractor={this._keyExtractor}
      ></FlatList>
    </View>
  }
}

export default HomeScreen;