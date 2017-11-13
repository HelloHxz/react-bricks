import { React, View, Text} from 'react-bricks';
import BlogHeader from '../../../components/blog/blogHeader';
import BlogContent from '../../../components/blog/blogContent';
import BlogGallery from '../../../components/blog/blogGallery';
import BlogFooter from '../../../components/blog/blogFooter';

class BlogItem extends React.Component{

    render(){
        return <View>
            <BlogHeader/>
            <BlogContent/>
            <BlogGallery/>
            <BlogFooter/>
        </View>
    }

}

export default BlogItem;