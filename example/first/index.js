import {Run} from "@bricks"

var config = {
	root:"home",
	pages:{
		Home:require("./pages/home").default,
		Chat:require("./pages/chat").default,
		
	},
};
export default Run(config)