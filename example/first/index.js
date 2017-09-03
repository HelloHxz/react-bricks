import Nav from '../../navigator'

var config = {
	root:"home",
	pages:{
		Home:require("./pages/home").default,
		Chat:require("./pages/chat").default,
		
	},
};
export default Nav(config)