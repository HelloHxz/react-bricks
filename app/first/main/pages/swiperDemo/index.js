import {View,Text,React,StyleSheet,PageView,Button,Image,Swiper} from "react-bricks"



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
    title: 'SwiperDemo',
  };

  renderSwiperItem(params){
    return ( <Image
          resizeMode='cover'
          style={{width:"100%",height:"100%"}}
          source={params.data.src}
        />);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <Swiper ref={(instance)=>{this.topswiper = instance;}} 
            style={StyleSheet.create({height:350})}
            lazyrender={false} 
            loop={true} 
            interval={5000} 
            cache={true} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </Swiper>
      </View>
    );
  }
}

