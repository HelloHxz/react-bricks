import { React, View, Text, StyleSheet,TouchableOpacity} from 'react-bricks'

class BlogContent extends React.Component{
    onPress(){
    }
    render(){
        return <View><Text><Text suppressHighlighting={true} onPress={this.onPress.bind(this)} style={StyleSheet.create({color:"blue"})}>@张三</Text>
            <Text style={StyleSheet.create({color:"blue"})}>#双十一#</Text><Text>今年双十一,双十一</Text></Text></View>
    }

}

export default BlogContent;