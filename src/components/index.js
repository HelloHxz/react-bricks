
import React from 'react';
import Tabs from './tabs'
import Run from './navigator'
import PageContainer from './pageContainer'
import TouchableWithoutFeedback from './touchablewithoutfeedback'
import Poplayer from './poplayer'
import Animated from './animated'
import Button from './button'
import View from './view'
import Popover from './popover'
import StyleSheet from './style';
import PlatForm from './platform';
import LayoutAnimation from './layoutanimation'
import UIManager from './uimanager'
import Picker from './picker'
import Icon from './icon';
import ScrollView from './scrollview';
import Switch from './switch';
import FlatList from './flatlist';
import Theme from './theme';
import Header from './header'
import Repeat from './repeat'
import Image from './image'
import ActivityIndicator from './activityindicator';
import {PageView,observer} from './pageview'
import Swiper from './swiper';
import Segment from './segment';
import SlideModal from './slideModal'
import Space from './space';
import Modal from './modal';
import {observable,extendObservable} from 'mobx'
import TouchableOpacity from './touchableopacity'
import TouchableHighlight from './touchablehighlight';
import TouchableNativeFeedback from './touchablenativefeedback'
import Text from './text';
import Grid from './grid';
import Container from './container';
import TouchScroll from './touchscroll'
import TextInput from './input'
import Easing from './easing'
import Fetch from './fetch'
import DatePicker from './datepicker';
import AnimatedView from './animatedView'



/*
	todo.. babel-plugin-import 按需加载
	按照babel-plugin-import  每个引用都需要挪到components目录下 
*/

export {
	ActivityIndicator,
	TouchableHighlight,
	Header,
	Easing,
	AnimatedView,
	extendObservable,
	Modal,
	Fetch,
	DatePicker,
	TouchableNativeFeedback,
	TextInput,
	Swiper,
	Container,
	SlideModal,
	Switch,
	Grid,
	Repeat,
	Space,
	Animated,
	LayoutAnimation,
	Theme,
	Picker,
	Segment,
	TouchableOpacity,
	UIManager,
	Icon,
	Image,
	FlatList,
	TouchableWithoutFeedback,
	View,
	PlatForm,
	Popover,
	Button,
	Poplayer,
	Tabs,
	PageContainer,
	Text,
	PageView,
	observable,
	observer,
	React,
	Run,
	ScrollView,
	StyleSheet
}