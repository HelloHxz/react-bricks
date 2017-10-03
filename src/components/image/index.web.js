import React from "react"
import "./index.less"

/*
  @@resizeMode 
  contain 长宽中大者设为100% default
  cover 长宽者小者设为100%
  stretch 展示全图
  orgin 展示原图

  @@src

  @@defaultSrc 
  @@resizeMode

  @@scrollkey @@pageview 必须将所在页面的页面实例也传过来配合使用
  1. 有scrollkey的时候 先判断是否在可视区，在直接加载图片 失败后显示默认
  没有在可视区先显示默认，然后根据scrollkey 进行可视区判断加载
  2.如果没有scrollkey直接加载图片然后失败显示默认

*/
class ImageCom extends React.Component {
  constructor(props) {
    super(props)

    // if(props.scrollKey&&!props.pageview){
    //   console.error("Image 组件使用scrollKey去按需加载的时候 必须指定pageview={xxx} xxx指的是所在页面的页面引用");
    // }
    this.state = {
      child:null
    }
  }

  loadImage(){
    var image = new Image();
    var _this = this;
    var src =  (typeof this.props.source === 'string' ? this.props.source : this.props.source.uri)||this.props.defaultSrc;
    image.onload = function(){
      _this.loadSuccess(image,src);
      _this.loadDone();
    }
    image.onerror = function(){
      _this.renderDefault();
      _this.loadDone();
    }
    //靠！！！解决safri 回退BUG
    setTimeout(()=>{
      image.src = src;
    },0)
  }

  loadDone(){
    this.hasLazyLoadDone = true;
    this.destory();
  }

  destory(){
    if(this.props.scrollKey){
    }
  }

  componentWillUnmount(){
    this.destory();
  }

  loadImageWhenInView(noInViewCallBack){
    if(this.hasLazyLoadDone){
      return;
    }
    if(!this.isInView()){
      noInViewCallBack&&noInViewCallBack();
      return;
    }
    this.loadImage();
  }

  onScrollIntoView(){
    this.loadImageWhenInView();
  }

  loadSuccess(image,src){
    var style = {};
    if(this.resizeMode==="orgin"){

    }else if(this.resizeMode==="contain"){
     if(image.width>image.height){
        style.width = "100%";
      }else{
        style.height = "100%";
      }
    }else if(this.resizeMode==="stretch"){

    }else{
      //cover
      if(image.width>image.height){
        style.width = "100%";
      }else{
        style.height = "100%";
      }
    }
    this.setState({
      child:<img style={style} src={src}/>,
    });
  }

  renderDefault(){
    //如果有自定义的 renderError 回掉则调用 没有的话则显示默认图片
    if(this.props.onRenderDefault){
      this.setState({
        child:this.props.onRenderDefault()
      });
    }else{
      if(this.props.defaultSrc){
        this.setState({
          child:<img src={this.props.defaultSrc}/>
        });
      }
    }
  }

  isInView(){
    return true;
    // var rect =  this.wrapper.getBoundingClientRect();
    // var verInView = (rect.top>=0&&rect.top<=Style.screen.height)||(rect.bottom>=0&&rect.bottom<=Style.screen.height);
    // var horInView = (rect.left>=0&&rect.left<=Style.screen.width)||(rect.right>=0&&rect.right<=Style.screen.width);
    // if(verInView&&horInView){
    //   return true;
    // }
    // return false;
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){
    

    this.resizeMode = this.props.resizeMode||"cover";
    if(props.scrollKey){

    }else{
      this.loadImage();
    }

  }

  onClick(){
    if(this.props.onPress){
      this.props.onPress();
    }
  }

  componentWillReceiveProps(nextPros){
    if(nextPros.src!==this.props.src){
      this.init(nextPros);
    }
  }

  render() {
    var classNameArr = ["xz-image"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    return (<div
      style={this.props.style||{}}
      onClick={this.onClick.bind(this)}
      ref={(wrapper)=>{this.wrapper= wrapper;}}
     className={classNameArr.join(" ")}>{this.state.child}</div>);
  }
}

export default ImageCom;
