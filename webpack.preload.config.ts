import type { Configuration } from "webpack";

import { rendererProcessRules } from "./webpack.rules";

const preloadConfig: Configuration = {
	target: "electron-preload",
	module: {
		rules: [...rendererProcessRules],
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
	},
	node: {
		__dirname: false,
		__filename: false,
	},
};

export default preloadConfig;
