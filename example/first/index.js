import {Run} from "react-bricks"

var config = {
	root:"home",
	pages:{
		home:require("./pages/home").default,
		chat:require("./pages/chat").default,
		
	},
};
export default Run(config)