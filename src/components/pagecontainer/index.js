import React from 'react'
import {
  View,Text,Button
} from 'react-native';
/*
  如果在同一个container中需要展示同一个页面多次  那么这个页面的名称格式为 页面名称_唯一标示
  比如 index_11

  
*/
class PageContainer extends React.Component {


  constructor(props) {
    super(props)
    this.arr = {};
    this.dict = {};
   //pagename:props.params.__childpage
    this.prepareRoute(props);

  }

  prepareRoute(props,cacheSuccess){
    var route = [];
    var ToPageName;
  
 
    ToPageName = props.params.__childpage;

   
    this.curpagename = ToPageName;
    var key = props.navigation.state.key+"_"+ToPageName;
    if(!this.arr[ToPageName]){
      var P = global.__bricks__.config.pages[ToPageName.split("_")[0]];
      this.arr[ToPageName]=(<P 
                    ref={(instance)=>{
                      this.dict[ToPageName] = instance;
                    }}
                    owner = {props.owner}
                    isInTab = {true}
                    pagename={ToPageName} 
                    navigation={props.navigation} 
                    key={key} 
                    pkey={key}></P>) ;

    }else{
      cacheSuccess&&cacheSuccess(route,ToPageName);
    }
  }

 
  componentWillReceiveProps(props){
    this.prepareRoute(props,(route,ToPageName)=>{
      //支持多级 如果支持两级 考虑删掉
      //this.dict[ToPageName].setState({leftroute:route,pagename:ToPageName});
    });

    // pagename:props.params.__childpage
    
  }


  render() {
    var re = [];
    for(var key in this.arr){
      if(key===this.curpagename){
        re.push(<View key={key+"_containerwrapper"} style={{position:"absolute",width:"100%",height:"100%",left:0,top:0}}>{this.arr[key]}</View>);
      }else{
        re.push(<View key={key+"_containerwrapper"} style={{position:"absolute",width:"100%",height:"100%",left:"-101%",top:0}}>{this.arr[key]}</View>);
      }
    }
    return (<View style={{flex:1,overflow:"hidden"}}>{re}</View>);
  }
}
export default  PageContainer;

