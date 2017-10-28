var View = require("./view").default;
import React from 'react';
import Animated from './animated'
var Tabs = require("./tabs").default;
var Button = require("./button").default;
var TouchableWithoutFeedback = require("./touchablewithoutfeedback").default;
var Poplayer = require("./poplayer").default;
var PageContainer = require("./pageContainer").default;
var Run = require("./navigator").default;
import Popover from './popover'
import StyleSheet from './style';
import PlatForm from './platform';
import LayoutAnimation from './layoutanimation'
import UIManager from './uimanager'
import Picker from './picker'
import Icon from './icon';
import ScrollView from './scrollview';
import FlatList from './flatlist';
import Theme from './theme';
import Header from './header'
import Menu from './menu'
import Image from './image'
import ActivityIndicator from './activityindicator';
import {PageView,observer} from './pageview'
import Swiper from './swiper';
import Segment from './segment';
import Space from './space';
import {observable} from 'mobx'
import TouchableOpacity from './touchableopacity'
import TouchableHighlight from './touchablehighlight';
import Text from './text';
import Grid from './grid';
import Container from './container';
import TouchScroll from './touchscroll'
import TextInput from './input'
import Fetch from './fetch'



/*
	todo.. babel-plugin-import 按需加载
	按照babel-plugin-import  每个引用都需要挪到components目录下 
*/


export {
	ActivityIndicator,
	TouchableHighlight,
	Header,
	Fetch,
	TextInput,
	Swiper,
	Container,
	Grid,
	Menu,
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