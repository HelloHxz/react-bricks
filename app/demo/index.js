import {Run,Theme,Icon} from "react-bricks"
import AppSvgs from './main/assets/svg/svgs';

Icon.DemoIcons = AppSvgs;

Theme.extend(Theme,{});

var config = {
	root:"weibo/home",
	devConfig:{
		development:{
			server:"http://localhost:8000"
		},
		uat:{
			
		},
		production:{

		}
	},
	pages:{
		homeDemo:require("./main/pages/home").default,
		ajaxDemo:require("./main/pages/ajaxDemo").default,
		switchDemo:require("./main/pages/switchDemo").default,
		tabbardemo:require("./main/pages/tabbarDemo").default,
		datePickerDemo:require("./main/pages/datePickerDemo").default,
		buttonDemo:require("./main/pages/buttonDemo").default,
		iconDemo:require("./main/pages/iconDemo").default,
		imageDemo:require("./main/pages/imageDemo").default,
		swiperDemo:require("./main/pages/swiperDemo").default,
		popoverDemo:require("./main/pages/popoverDemo").default,
		poplayerDemo:require("./main/pages/poplayerDemo").default,
		repeatDemo:require("./main/pages/repeatDemo").default,
		gridDemo:require("./main/pages/gridDemo").default,
		segmentContainerDemo:require("./main/pages/segmentContainerDemo").default,
		tabsDemo:require("./main/pages/tabsDemo").default,
		inputDemo:require("./main/pages/inputDemo").default,
		pickerDemo:require("./main/pages/pickerDemo").default,


		home:require("./main/pages/weibo/pages/home").default,
		weibo:require("./main/pages/weibo/pages/root").default,
		discover:require("./main/pages/weibo/pages/discover").default,
		me:require("./main/pages/weibo/pages/me").default,
		message:require("./main/pages/weibo/pages/message").default,
	},
};
export default Run(config)