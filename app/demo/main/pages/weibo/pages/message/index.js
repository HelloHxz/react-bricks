import {View,Text,React,ScrollView,Button,AnimatedView,IOSHeaderPlaceHolder,Theme,StyleSheet,Image,TouchableOpacity,Icon,PageView,Swiper,Grid} from "react-bricks"
import MessageTabs from './components/tabs';
import MessageStore from './store'

var siwperData = [
  {src:require('../../../../assets/imgs/2.jpg'),title:"xxx"},
  {
    src:require('../../../../assets/imgs/4.jpg'),title:"xxx",
   },
   {src:require('../../../../assets/imgs/3.jpg'),title:"xxx"},
   {src:require('../../../../assets/imgs/1.jpg'),title:"xxx"}
 ];
 


@PageView
class MessagePage extends React.Component {

  static connectStore(){
    return {
      messageStore:new MessageStore
    }
  }
  constructor(props){
    super(props);
    this.state = {
      gridState:0
    };
  }
  componentDidMount() {
  }

  onPageBeforeLeave(){
    return true;
  }

  renderItem(params){
    return [<Icon key='1' colorful={true} style={StyleSheet.create({fontSize:89})} icon={Icon.DemoIcons.cookie_colorful}/>,
    <Text style={StyleSheet.create({fontSize:23,color:"rgb(90, 90, 90)"})} key='2'>深圳</Text>]
  }

  onItemPress(){
    this.setState({
      gridState:this.state.gridState===0?1:0
    })
  }

  renderSwiperItem(params){
    return ( <Image
          resizeMode='cover'
          style={{width:"100%",height:"100%"}}
          source={params.data.src}
        ></Image>);
  }


  render() {
    return (
      <ScrollView style={{flex:1,backgroundColor:"#fff"}}>
         <IOSHeaderPlaceHolder/>
         <View style={StyleSheet.create({height:78,backgroundColor:"#fff",justifyContent:"center",alignItems:"center"})}>
            <Button type='primary' style={StyleSheet.create({backgroundColor:"#eee",height:56,width:700})}>
              <Icon style={StyleSheet.create({fontSize:30,color:"gray"})} icon={Icon.DemoIcons.search}/>
              <Text style={StyleSheet.create({fontSize:26,color:"gray",marginLeft:10})}>搜索</Text>
            </Button>
         </View>
         <Swiper ref={(instance)=>{this.topswiper = instance;}} 
            style={StyleSheet.create({height:200})}
            lazyrender={false} 
            loop={true} 
            interval={6000} 
            cache={true} 
            data={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </Swiper>
          <Grid
          onItemPress={this.onItemPress.bind(this)}
          style={StyleSheet.create({paddingTop:14})} bordernone={true} data={[{},{},{},{},{},{},{},{},{},{}]} column={5} renderItem={this.renderItem.bind(this)}/>
          <AnimatedView
            state={this.state.gridState}
            config={[
              {height:0,opacity:0.1},
              {height:150,opacity:1}
            ]}
          >
            <Grid style={StyleSheet.create({})} bordernone={true} data={[{},{},{},{},{}]} column={5} renderItem={this.renderItem.bind(this)}/>
          </AnimatedView>
          <MessageTabs messageStore={this.props.messageStore}></MessageTabs>
      </ScrollView>
    );
  }
}

export default MessagePage;

