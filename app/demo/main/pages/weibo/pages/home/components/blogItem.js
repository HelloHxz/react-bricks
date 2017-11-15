import { React, View, Text, StyleSheet} from 'react-bricks';
import BlogHeader from '../../../components/blog/blogHeader';
import BlogContent from '../../../components/blog/blogContent';
import BlogGallery from '../../../components/blog/blogGallery';
import BlogFooter from '../../../components/blog/blogFooter';

class BlogItem extends React.Component{

    render(){
        return <View style={StyleSheet.create({paddingLeft:20,paddingRight:20,paddingTop:20,marginBottom:15,backgroundColor:"#fff"})}>
            <BlogHeader/>
            <BlogContent/>
            <BlogGallery/>
            <BlogFooter/>
        </View>
    }

}

export default BlogItem;