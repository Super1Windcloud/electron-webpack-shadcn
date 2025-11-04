import path from "path";

export const aliases = {
	"@": path.resolve(__dirname, "src"),
	"tiny-warning": path.resolve(
		__dirname,
		"node_modules/tiny-warning/dist/tiny-warning.cjs.js",
	),
};
