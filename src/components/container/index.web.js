import React from "react"
import "./index.less"


class Conatiner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config:props.config||{}
    }

    this.childrenDict={};
  }


  componentWillReceiveProps(nextPros){
    if(JSON.stringify(this.state.config)!==JSON.stringify(nextPros.config)){
      this.setState({
        config:nextPros.config||{}
      });
    }
  }

  renderItem(config){
    if(!this.props.renderItem){
      console.error("StatusView 缺少renderItem");
    }
    return this.props.renderItem(config);
  }

  render() {
    var config = this.state.config;
    
    if(config.key&&!this.childrenDict[config.key]){
      this.childrenDict[config.key] = {
        key:config.key,
        config:config,
        instance:this.renderItem(config)
      };
    }

    var children = [];
     
    var bk = null;
    for(var key in this.childrenDict){
     
      var itemClassArr =["xz-statusview-item"];
      if(key===config.key){
        itemClassArr.push("xz-statusview-item-show")
      }else{
        itemClassArr.push("xz-statusview-item-hide")
      }
 
      children.push(
          <div className={itemClassArr.join(" ")} key={key+"_inner"}>
           {this.childrenDict[key].instance}
        </div>);
    }

    var needreRender = false;
     if(!config.key||!config){
        for(var key in this.childrenDict){
          if(this.childrenDict[key].config.cache!==true){
             delete this.childrenDict[key];
             needreRender = true;
          }
        }
    }
    if(needreRender){
      setTimeout(()=>{this.setState({seed:1});},260);
    }
    var classArr = ["xz-statusview"];
    if(this.props.className){
      classArr.push(this.props.className);
    }
    return (<div className={classArr.join(" ")}>
      {children}
    </div>);
  }
}

export default Conatiner;
