
let Common = {
	theme_deep_color:"rgb(2, 100, 185)",
	theme_color:"rgb(27, 144, 247)",
	theme_text_color:"rgb(67, 67, 67)",
	theme_border_color:"#bbb",
	theme_background_color:"#f2f3f4",
	theme_bk_opacity:.3,
	theme_disabled_color:"#eee",
	underlaycolor:"#eee"
}

let Re = {
	/*单位px*/
	/*button*/
	/*button size*/
	btn_sm:{
		height:53,
		fontSize:23
	},
	btn_lg:{
		height:75,
		fontSize:26
	},
	btn_default:{
		height:70,
		fontSize:23
	},
	/*button type*/
	btn_primary:{
		backgroundColor:Common.theme_color,
    	borderRadius: 8,
    	color:"#fff",
    	// borderWidth:1,
    	// borderColor:Common.theme_deep_color,
    	// borderStyle:"solid"
	},
	btn_hollow:{
		borderStyle:"solid",
		borderWidth:1,
		borderRadius: 8,
    	color:Common.theme_color,
		borderColor:Common.theme_color,
    	backgroundColor:"#fff"
	},
	btn_flat:{
		borderLeftWidth:0,
		borderRightWidth:0,
		color:Common.theme_color,
		borderColor:Common.theme_border_color,
		borderStyle:"solid",
		borderBottomWidth:1,
		borderTopWidth:1,
    	backgroundColor:"#fff"
	},
	btn_text:{
		borderWidth:0,
		color:Common.theme_color,
	},
	/*禁用*/
	btn_primary_disabled:{

	},
	btn_hollow_disabled:{

	},
	/*icon*/
	icon_sm:{
		fontSize:30,
		width:60
	},
	icon_lg:{
		fontSize:70,
		width:110
	},
	icon_default:{
		fontSize:45,
		width:90
	},
	icon_color:Common.theme_color,
	icon_disabled_color:Common.theme_disabled_color,
	icon_wrapper_primary:{
		backgroundColor:Common.theme_color,
    	borderRadius: 8,
    	color:"#fff",
	},
	icon_wrapper_hollow:{
		borderStyle:"solid",
		borderWidth:1,
		borderRadius: 8,
    	color:Common.theme_color,
		borderColor:Common.theme_color,
    	backgroundColor:"#fff"
	},
	/*toast*/
	toast:{
		background:"#000"
	},
	/*pull */
	flatlist_pullheight:150,
	header:{
		height:85,
		flexDirection:"row",
		alignItems:"center",
		borderBottomWidth:1,
		borderStyle:"solid",
		backgroundColor:"#fff",
		borderColor:Common.theme_border_color
	},
	extend(defaultTheme,extendTheme){
		defaultTheme.test = "huxiaozhong"
	},
	menu_press_underlaycolor:Common.underlaycolor,
	menu_item_height:100,
	menu_split_line_color:Common.theme_border_color,
	menu_space_backgroundcolor:Common.theme_background_color,
	menu_space_bordercolor:Common.theme_border_color,
	segment_lg_height:74,
	segment_press_underlaycolor:Common.underlaycolor,
	segment_default_height:64,
	segment_sm_height:50,
	segment_border_radius:8,
	segment_border_width:2,
	segment_border_color:Common.theme_color,
	segment_selected_backgroundcolor:Common.theme_color,
	segment_selected_color:"#fff",

	tabs_lg_height:110,
	tabs_selected_backgroundcolor:"transparent",
	tabs_backgroundcolor:"#fff",
	tabs_press_underlaycolor:Common.underlaycolor,
	tabs_default_height:92,
	tabs_sm_height:70,

	alert_bk_opacity:Common.theme_bk_opacity,

	image_background_color:"#eee"
	
};
export default {...Common,...Re};