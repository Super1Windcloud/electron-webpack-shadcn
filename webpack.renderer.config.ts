import type { Configuration } from "webpack";
import { rendererProcessRules } from "./webpack.rules";
import { aliases } from "./webpack.aliases";

const rules = [
	...rendererProcessRules,
	{
		test: /\.css$/,
		use: [
			{ loader: "style-loader" },
			{
				loader: "css-loader",
				options: {
					importLoaders: 1,
				},
			},
			{ loader: "postcss-loader" },
		],
	},
];

export const rendererConfig: Configuration = {
	module: {
		rules,
	},
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
		alias: aliases,
	},
};
