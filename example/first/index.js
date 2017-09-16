import {Run} from "react-bricks"

var config = {
	root:"home",
	pages:{
		home:require("./pages/home").default,
		chat:require("./pages/chat").default,
		setting:require("./pages/setting").default,
		my:require("./pages/my").default,
		
	},
};
export default Run(config)