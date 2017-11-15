import { React, StyleSheet,Icon,View, Text,TouchableOpacity} from 'react-bricks'


class BlogFooter extends React.Component{

    render(){
        return <View style={StyleSheet.create({height:64,flexDirection:'row',borderTopWidth:1,borderColor:"#ccc",borderStyle:"solid"})}>
            <TouchableOpacity style={StyleSheet.create({flex:1,flexDirection:'row',alignItems:'center',justifyContent:"center"})}>
                 <Icon style={StyleSheet.create({fontSize:48,color:'gray'})} icon={Icon.DemoIcons.zhuanfa}/>
                 <Text style={StyleSheet.create({marginLeft:8,fontSize:26,color:"gray"})}>121</Text>
            </TouchableOpacity>
            <TouchableOpacity style={StyleSheet.create({flex:1,flexDirection:'row',alignItems:'center',justifyContent:"center"})}>
                 <Icon style={StyleSheet.create({fontSize:34,color:'gray'})} icon={Icon.DemoIcons.comment}/>
                 <Text style={StyleSheet.create({marginLeft:8,fontSize:26,color:"gray"})}>121</Text>
            </TouchableOpacity>
            <TouchableOpacity style={StyleSheet.create({flex:1,flexDirection:'row',alignItems:'center',justifyContent:"center"})}>
                 <Icon style={StyleSheet.create({fontSize:34,color:'gray'})} icon={Icon.DemoIcons.good}/>
                 <Text style={StyleSheet.create({marginLeft:8,fontSize:26,color:"gray"})}>121</Text>
            </TouchableOpacity> 
        </View>
    }

}

export default BlogFooter;