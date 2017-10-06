import React from "react"

class StickyView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      children:this.props.children
    }
  }


  render() {
    return (<div 
      ref={(root)=>{this.rootDom = root;}}
      className="xz-scroll-sticky-wrapper" style={{width:"100%",top:this.props.stickyOffset,position:"absolute",zIndex:2}}>
        {this.state.children}
      </div>);
  }
}

export default StickyView;
