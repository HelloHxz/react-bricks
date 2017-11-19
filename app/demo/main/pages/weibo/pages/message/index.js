import {View,Text,React,ScrollView,Button,IOSHeaderPlaceHolder,Theme,StyleSheet,Image,TouchableOpacity,Icon,PageView,Swiper} from "react-bricks"
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
  componentDidMount() {
  }

  onPageBeforeLeave(){
    return true;
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
      <ScrollView style={{flex:1,backgroundColor:Theme.theme_background_color}}>
         <IOSHeaderPlaceHolder/>
         <View style={StyleSheet.create({height:78,backgroundColor:"#fff",justifyContent:"center",alignItems:"center"})}>
            <Button type='primary' style={StyleSheet.create({backgroundColor:"#eee",height:56,width:700})}>
              <Icon style={StyleSheet.create({fontSize:30,color:"gray"})} icon={Icon.DemoIcons.search}/>
              <Text style={StyleSheet.create({fontSize:26,color:"gray",marginLeft:10})}>搜索</Text>
            </Button>
         </View>
         <Swiper ref={(instance)=>{this.topswiper = instance;}} 
            style={StyleSheet.create({height:220})}
            lazyrender={false} 
            loop={true} 
            interval={6000} 
            cache={true} 
            data={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </Swiper>
          <MessageTabs messageStore={this.props.messageStore}></MessageTabs>
      </ScrollView>
    );
  }
}

export default MessagePage;

