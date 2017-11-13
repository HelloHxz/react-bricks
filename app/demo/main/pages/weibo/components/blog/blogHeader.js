import { React, View, Text, StyleSheet, Image} from 'react-bricks'

class BlogHeader extends React.Component{

    render(){
        return (
        <View style={StyleSheet.create({flexDirection:"row",paddingTop:6,paddingBottom:6,paddingLeft:10,alignItems:"center"})}>
            <Image
                style={StyleSheet.create({width:70,height:70,borderRadius:35})}
                source={require('../../../../assets/imgs/1.jpeg')}
            />
            <View style={StyleSheet.create({flex:1,paddingLeft:10})}>
                <Text>刘德华</Text>
                <View style={{flexDirection:"row"}}>
                    <Text>19 分钟前</Text>
                    <Text> 来自</Text>
                    <Text> xxx客户端</Text>
                </View>
            </View>
        </View>)
    }

}

export default BlogHeader;