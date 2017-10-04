import {View,Text,React,StyleSheet,PageView,Button,Image} from "react-bricks"


const imgurl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506942039759&di=c09b7da92055a60c4b1cc3f4aad27a61&imgtype=0&src=http%3A%2F%2Fpic7.nipic.com%2F20100504%2F2425919_150716548243_2.jpg";


@PageView({rootStore:null,homeStore:null})
export default class IconDemo extends React.Component {
	
  static navigationOptions = {
    title: 'ImageDemo',
  };

  componentDidMount() {
  }

  render() {
    return (
      <View>
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
      </View>
    );
  }
}

