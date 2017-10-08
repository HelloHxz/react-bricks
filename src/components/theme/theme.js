
let Common = {
	theme_color:"#0c60aa",
	theme_text_color:"#333",
	theme_border_color:"#333",
	theme_background_color:"#333",
	theme_disabled_color:"#eee"
}

let Re = {
	/*单位px*/
	/*button*/
	/*button size*/
	btn_sm:{
		height:53,
		fontSize:20
	},
	btn_lg:{
		height:75,
		fontSize:26
	},
	btn_default:{
		height:65,
		fontSize:23
	},
	/*button type*/
	btn_primary:{
		backgroundColor:Common.theme_color,
    	borderRadius: 8,
    	color:"#fff"
	},
	btn_hollow:{
		borderStyle:"solid",
		borderWidth:1,
		borderRadius: 8,
    	color:Common.theme_text_color,
		borderColor:Common.theme_color
	},
	btn_flat:{
		borderLeftWidth:0,
		borderRightWidth:0,
		color:Common.theme_text_color,
		borderColor:Common.theme_border_color,
		borderStyle:"solid",
		borderBottomWidth:1,
		borderTopWidth:1,
	},
	btn_text:{
		borderWidth:0,
		color:Common.theme_text_color,
	},
	/*禁用*/
	btn_primary_disabled:{

	},
	btn_hollow_disabled:{

	},
	/*icon*/
	icon_sm:{
		width:30
	},
	icon_lg:{
		width:65
	},
	icon_default:{
		width:45
	},
	icon_color:Common.theme_color,
	icon_disabled_color:Common.theme_disabled_color,
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
	}
};
export default Re;