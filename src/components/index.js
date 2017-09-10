var View = require("./view").default;
var Text = require("./text").default;
import React from 'react';
var ScrollView = require("./text").default;
var Button = require("./button").default;
var Run = require("../navigator").default;
import StyleSheet from '../utils/style'
import {connect,observer} from '../utils/mobx'
import {observable} from 'mobx'

/*
	todo.. babel-plugin-import 按需加载
	按照babel-plugin-import  每个引用都需要挪到components目录下 
*/

export {
	View,
	Button,
	Text,
	connect,
	observable,
	observer,
	React,
	Run,
	ScrollView,
	StyleSheet
}