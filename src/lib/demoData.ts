export type ShowcaseStat = {
	label: string;
	value: string;
	hint: string;
};

export const fetchShowcaseStats = async (): Promise<ShowcaseStat[]> => {
	await new Promise((resolve) => setTimeout(resolve, 650));
	return [
		{
			label: "Query 缓存命中率",
			value: "98%",
			hint: "跨窗口共享状态，避免重复请求",
		},
		{
			label: "Zustand actions",
			value: "3ms",
			hint: "微秒级状态写入，丝滑过渡",
		},
		{
			label: "主题切换延迟",
			value: "0.4ms",
			hint: "next-themes + CSS 变量即时响应",
		},
	];
};
