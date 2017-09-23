import React from 'react'
import {observer,Poplayer} from "react-bricks"

@observer
class PoplayerManager extends React.Component {
  render() {
    return (
      <Poplayer config={this.props.homeStore.popLayerConfig}/>
    );
  }
}

export default PoplayerManager;