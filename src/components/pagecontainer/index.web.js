import React from 'react'
import PageView from '../navigator/web/pageview'

import LazyLoadPage from "../navigator/web/lazyLoadPage";
/*
  如果在同一个container中需要展示同一个页面多次  那么这个页面的名称格式为 页面名称_唯一标示
  比如 index_11
*/
class PageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.arr = {};
    this.dict = {};
   
    this.prepareRoute(props);

  }

  prepareRoute(props,cacheSuccess){
    var route = [];
    var ToPageName;
    if(props.withurl ===false){//pageContainer  不和url使用

    }else{
      if(props.owner){
        route = JSON.stringify(props.leftroute);
        route = JSON.parse(route);
      }
      ToPageName = route.shift();
    }

   
    this.curpagename = ToPageName;
    var key = props.owner.props.base.props.pkey+"_"+ToPageName;
    if(!this.arr[ToPageName]){
      var P = PageView;
      var ToPageInstance = props.owner.props.navigation.props.config.pages[ToPageName.split("_")[0]];
      if(!ToPageInstance.prototype.__proto__.forceUpdate){
        P = LazyLoadPage;
      }

      this.arr[ToPageName]=(<P 
                    ref={(instance)=>{
                      this.dict[ToPageName] = instance;
                    }}
                    propsstore={props.store}
                    leftroute={route} 
                    owner = {props.owner}
                    pagename={ToPageName} 
                    navigation={props.owner.props.navigation} 
                    key={key} 
                    pkey={key}></P>) ;

    }else{
      cacheSuccess&&cacheSuccess(route,ToPageName);
    }
  }

 
  componentWillReceiveProps(props){
    this.prepareRoute(props,(route,ToPageName)=>{
      this.dict[ToPageName].setState({leftroute:route,pagename:ToPageName});
    });
    
  }


  render() {
    var re = [];
    var className = ["xz-pconatiner-default"];
    if(this.props.className){
      className.push(this.props.className);
    }else{
      className.push("xz-pconatiner");
    }
    for(var key in this.arr){
      if(key===this.curpagename){
        re.push(<div className="full-screen" key={key+"_containerwrapper"}>{this.arr[key]}</div>);
      }else{
        re.push(<div  className="full-screen"  key={key+"_containerwrapper"} style={{display:"none"}}>{this.arr[key]}</div>);
      }
    }
    return (<div className={className.join(" ")}>{re}</div>);
  }
}
export default  PageContainer;
