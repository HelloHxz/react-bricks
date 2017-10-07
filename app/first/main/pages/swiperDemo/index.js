import {View,Text,React,StyleSheet,PageView,Button,Image,Swiper,Header,TouchableOpacity,Icon} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';


var siwperData = [
 {src:require('../../assets/imgs/2.jpg'),title:"xxx"},
 {
   src:require('../../assets/imgs/4.jpg'),title:"xxx",
  },
  {src:require('../../assets/imgs/3.jpg'),title:"xxx"},
  {src:require('../../assets/imgs/1.jpg'),title:"xxx"}
];



@PageView({rootStore:null,homeStore:null})
export default class SwiperDemo extends React.Component {
	
  static navigationOptions = {
    header: null,
  };

  renderSwiperItem(params){
    return ( <Image
          resizeMode='cover'
          style={{width:"100%",height:"100%"}}
          source={params.data.src}
        ></Image>);
  }

  goBack(){
    this.props.navigation.goBack();
  }
  
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff",overflow:"hidden"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <Swiper ref={(instance)=>{this.topswiper = instance;}} 
            style={StyleSheet.create({height:350})}
            lazyrender={false} 
            loop={true} 
            interval={3000} 
            cache={true} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </Swiper>
      </View>
    );
  }
}

