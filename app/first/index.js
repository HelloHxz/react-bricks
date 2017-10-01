import {Run} from "react-bricks"

var config = {
	root:"home",
	pages:{
		home:require("./main/pages/home").default,
		chat:require("./main/pages/chat").default,
		setting	:require("./main/pages/setting").default,
		my:require("./main/pages/my").default,
		
	},
};
export default Run(config)