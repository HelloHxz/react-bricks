var View = require("./view").default;
var Text = require("./text").default;
import React from 'react';
import Animated from './animated'
var ScrollView = require("./text").default;
var Segment = require("./segment").default;
var Button = require("./button").default;
var Poplayer = require("./poplayer").default;
var PageContainer = require("./pageContainer").default;
var Run = require("../navigator").default;
import StyleSheet from './style'
import {PageView,observer} from './pageview'

import {observable} from 'mobx'


/*
	todo.. babel-plugin-import 按需加载
	按照babel-plugin-import  每个引用都需要挪到components目录下 
*/

export {
	Animated,
	View,
	Button,
	Poplayer,
	Segment,
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