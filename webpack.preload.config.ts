import type { Configuration } from "webpack";

import { rendererProcessRules } from "./webpack.rules";
import { aliases } from "./webpack.aliases";

const preloadConfig: Configuration = {
	target: "electron-preload",
	module: {
		rules: [...rendererProcessRules],
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
		alias: aliases,
	},
	node: {
		__dirname: false,
		__filename: false,
	},
};

export default preloadConfig;
