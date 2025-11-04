import type { Configuration } from "webpack";
import { plugins } from "./webpack.plugins";
import { rendererProcessRules } from "./webpack.rules";
import { aliases } from "./webpack.aliases";

const rules = [
	...rendererProcessRules,
	{
		test: /\.css$/,
		use: [{ loader: "style-loader" }, { loader: "css-loader" }],
	},
];

export const rendererConfig: Configuration = {
	module: {
		rules,
	},
	plugins,
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
		alias: aliases,
	},
};
