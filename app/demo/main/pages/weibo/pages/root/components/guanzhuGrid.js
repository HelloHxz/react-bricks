import {View,Text,React,StyleSheet,PageView,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Grid,Space} from "react-bricks"

class GuanZhuGrid extends React.Component {
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }


  renderItem(params){
    return [<Button key='btn' style={StyleSheet.create({width:"86%",height:70,backgroundColor:"#eee"})} type='primary'>
        <Text style={StyleSheet.create({fontSize:25,color:"#333"})}>特别关注</Text>
    </Button>]
  }

  render() {
    return (
       <View style={StyleSheet.create({alignItems:"center"})}>
          <View style={StyleSheet.create({justifyContent:"space-between",marginTop:10,width:"100%",paddingLeft:29,paddingRight:10,alignItems:'center',flexDirection:"row"})}>
              <Text style={StyleSheet.create({fontSize:25,color:'#bbb'})}>默认分组</Text>
              <Button  style={StyleSheet.create({height:56,width:100})} type='text'>
                <Text style={StyleSheet.create({fontSize:25,color:'orange'})}>编辑</Text>
              </Button>
          </View>
          <Grid bordernone={true} data={[{},{},{},{},{},{}]} 
          style={ StyleSheet.create({width:720}) }
          itemStyle={StyleSheet.create({paddingTop:10,paddingBottom:10,height:'auto'})}
          column={4} renderItem={this.renderItem.bind(this)}/>
          <View style={StyleSheet.create({justifyContent:"space-between",marginTop:10,width:"100%",paddingLeft:29,paddingRight:10,alignItems:'center',flexDirection:"row"})}>
            <Text style={StyleSheet.create({fontSize:25,color:'#bbb'})}>我的分组</Text>
          </View>
          <Grid bordernone={true} data={[{},{},{},{},{},{}]} 
          style={ StyleSheet.create({width:720}) }
          itemStyle={StyleSheet.create({paddingTop:10,paddingBottom:10,height:'auto'})}
          column={4} renderItem={this.renderItem.bind(this)}/>
      </View>
    );
  }
}

export default GuanZhuGrid;

