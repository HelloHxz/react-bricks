import { StackNavigator } from 'react-navigation';
import HomeScreen from './pages/home'
import ChatScreen from './pages/chat'

const SimpleApp = StackNavigator({
      Home: { screen: HomeScreen },
      Chat:{ screen: ChatScreen }
    });

export default SimpleApp;