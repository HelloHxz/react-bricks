import {View,Text,React,Button,Theme,StyleSheet,PageView,observer,SlideModal} from "react-bricks"

@observer
class MidlePage extends React.Component {
	

  midPageHide(){
    this.props.rootStore.showMidPage = false;
  }

  componentDidMount() {
  }

  render() {
    return (
      <SlideModal onBackLayerClick={this.midPageHide.bind(this)} visible={this.props.rootStore.showMidPage}><Text>T</Text></SlideModal>
    );
  }
}

export default MidlePage;

