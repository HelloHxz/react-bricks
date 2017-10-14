
import StyleSheet from '../style';
const Theme =require("../theme").default;

var Re = {
	getStyle:function(props){
		var wrapperStyle = {};
	    var type = props.type||"default";
	      if(["primary","hollow"].indexOf(type)<0){
	        type = "default";
	      }
	      var size = props.size||"default";
	    if(["lg","sm"].indexOf(size)<0){
	      size = "default";
	    }
	    var sizeStyle = Theme["icon_"+size];

	    var defaultWrapperStyle = Theme["icon_wrapper_"+type]||{};
	    wrapperStyle = Object.assign({},StyleSheet.create(defaultWrapperStyle),wrapperStyle,props.style||{});

	    var iconStyle = {};

	    if(wrapperStyle.fontSize){
	      iconStyle.width = wrapperStyle.fontSize;
	    }else{
	      iconStyle.width = StyleSheet.px(sizeStyle.fontSize);
	    }
	    if(wrapperStyle.width){
	      wrapperStyle.width = wrapperStyle.width;
	      wrapperStyle.height = wrapperStyle.width;
	    }else{
	      wrapperStyle.width =  StyleSheet.px(sizeStyle.width);
	      wrapperStyle.height =  StyleSheet.px(sizeStyle.width);
	    }
	  
	    iconStyle.height = iconStyle.width;

	    if(type==="default"){
	      wrapperStyle.width = iconStyle.width;
	      wrapperStyle.height =  iconStyle.width;
	    }

	    if(props.circle){
	      wrapperStyle.height =  wrapperStyle.width;
	      if(StyleSheet.isWeb){
	         wrapperStyle.borderRadius = "100%";
	      }else{
	          wrapperStyle.borderRadius =  wrapperStyle.height/2;
	      }
	    }


	    var color = wrapperStyle.color||Theme.icon_color;
	    delete wrapperStyle.color;
	    delete wrapperStyle.fontSize;
	    return {
	      iconStyle:iconStyle,
	      color:color,
	      wrapperStyle:wrapperStyle
	    };
	}
}

export default Re;