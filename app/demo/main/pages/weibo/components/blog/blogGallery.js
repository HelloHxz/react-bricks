import { React, View, Text,Grid,StyleSheet} from 'react-bricks'

class BlogGallery extends React.Component{
    renderItem(){
        return <View style={{backgroundColor:"#eee",width:"100%",height:'100%'}}></View>
    }
    render(){
        return <Grid data={[{},{},{},{},{}]}
        hBorderStyle={ {width:10,borderColor:'#fff'} } 
        vBorderStyle={ {width:10,borderColor:'#fff'} } 
        style={ StyleSheet.create({width:600}) }
        column={3} renderItem={this.renderItem.bind(this)}/>
    }

}

export default BlogGallery;