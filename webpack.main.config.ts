import type { Configuration } from "webpack";
import { plugins } from "./webpack.plugins";
import { mainProcessRules } from "./webpack.rules";
import { aliases } from "./webpack.aliases";

export const mainConfig: Configuration = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: "./src/index.ts",
	// Put your normal webpack config below here
	module: {
		rules: mainProcessRules,
	},
	plugins,
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
		alias: aliases,
	},
};
