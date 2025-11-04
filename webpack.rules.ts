import type { ModuleOptions } from "webpack";

type RuleSet = Required<ModuleOptions>["rules"];

const tsRule: RuleSet[number] = {
	test: /\.tsx?$/,
	exclude: /(node_modules|\.webpack)/,
	use: {
		loader: "ts-loader",
		options: {
			transpileOnly: true,
		},
	},
};

const nativeModuleRules: RuleSet = [
	{
		test: /native_modules[/\\].+\.node$/,
		use: "node-loader",
	},
	{
		test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: "@vercel/webpack-asset-relocator-loader",
			options: {
				outputAssetBase: "native_modules",
			},
		},
	},
];

export const mainProcessRules: RuleSet = [...nativeModuleRules, tsRule];

export const rendererProcessRules: RuleSet = [tsRule];
