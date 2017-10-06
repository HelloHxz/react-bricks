import React from "react"
import "./index.less"

function getIOS(color,type){
  if(!color||color.toString().indexOf("#")!==0){
    if(type==='android'){
      color = '388ae8';
    }else{
      color = "000";
    }
  }else{
    color = color.toString().substring(1);
  }

  if(type==='android'){
    return "data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='59.75' height='60.25' viewBox='0 -2 59.75 60.25'><path fill='%23ccc' d='M29.691-.527c-15.648 0-28.333 12.685-28.333 28.333s12.685 28.333 28.333 28.333c15.648 0 28.333-12.685 28.333-28.333S45.339-.527 29.691-.527zm.184 53.75c-14.037 0-25.417-11.379-25.417-25.417S15.838 2.39 29.875 2.39s25.417 11.379 25.417 25.417-11.38 25.416-25.417 25.416z'/><path fill='none' stroke='%23"+color+"' stroke-width='3' stroke-linecap='round' stroke-miterlimit='10' d='M56.587 29.766c.369-7.438-1.658-14.699-6.393-19.552'/></svg>"
  }

  return "data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23"+color+"'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";

}
class Spin extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
  	var classNameArr = ["xz-spin"];
    var style= {};
  	if(this.props.type==="android"){
  		classNameArr.push("android-spin");
  	}else{
		  classNameArr.push("ios-spin");
  	}
    if(!this.props.size){
      style.width = ".67rem";
      style.height = ".67rem";
    }else{
      style.width =this.props.size;
      style.height = this.props.size;
    }
    style["backgroundImage"] = 'url("'+getIOS(this.props.color,this.props.type)+'")'
    return (<span style={style} className={classNameArr.join(" ")}></span>);
  }
}

export default Spin;
