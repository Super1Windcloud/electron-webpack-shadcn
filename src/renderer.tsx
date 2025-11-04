import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "next-themes";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { create } from "zustand";

import "./index.css";

type DesktopBridge = {
	getVersions: () => {
		electron: string;
		chrome: string;
		node: string;
	};
};

declare global {
	interface Window {
		desktopBridge: DesktopBridge;
	}
}

type Feature = {
	emoji: string;
	title: string;
	description: string;
	detail: string;
	tag: string;
};

const features: Feature[] = [
	{
		emoji: "⚡",
		title: "极速开发",
		description: "热重载与 React Query 带来“保存即更新”的开发体验。",
		detail:
			"通过 React Query 的智能缓存，你可以在不同窗口间共享请求状态，避免重复请求。",
		tag: "prod-ready",
	},
	{
		emoji: "🎨",
		title: "沉浸式多主题",
		description: "next-themes 让浅色/深色 UI 切换零成本。",
		detail:
			"ThemeProvider 会自动记住用户偏好，并在系统主题变化时即时同步，适合桌面 App。",
		tag: "design",
	},
	{
		emoji: "🧩",
		title: "状态驱动界面",
		description: "Zustand 提供轻量可组合的全局状态，API 友好。",
		detail:
			"使用 Immer 与订阅切片，既能保持优秀性能，也能带来简洁的开发体验。",
		tag: "state",
	},
];

type FeatureState = {
	activeFeature: Feature["title"];
	setActiveFeature: (title: Feature["title"]) => void;
};

const useFeatureStore = create<FeatureState>((set) => ({
	activeFeature: features[0].title,
	setActiveFeature: (title) => set({ activeFeature: title }),
}));

type ShowcaseStat = {
	label: string;
	value: string;
	hint: string;
};

const fetchShowcaseStats = async (): Promise<ShowcaseStat[]> => {
	// 模拟一个会被 React Query 缓存的请求
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

const StatusBadge = ({ label, value }: { label: string; value: string }) => (
	<div className="status-badge">
		<span className="status-label">{label}</span>
		<span className="status-value">{value}</span>
	</div>
);

const ThemeToggle = () => {
	const { theme, systemTheme, setTheme } = useTheme();
	const resolvedTheme = (theme === "system" ? systemTheme : theme) ?? "light";
	const isDark = resolvedTheme === "dark";
	const nextTheme = isDark ? "light" : "dark";

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={() => setTheme(nextTheme)}
		>
			<span aria-hidden>{isDark ? "🌙" : "☀️"}</span>
			<span>{isDark ? "深色模式" : "浅色模式"}</span>
		</button>
	);
};

const FeatureCard = ({ feature }: { feature: Feature }) => {
	const activeFeature = useFeatureStore((state) => state.activeFeature);
	const setActiveFeature = useFeatureStore((state) => state.setActiveFeature);
	const isActive = feature.title === activeFeature;

	return (
		<button
			type="button"
			onClick={() => setActiveFeature(feature.title)}
			className={`feature-card ${isActive ? "active" : ""}`}
		>
			<div className="feature-card-header">
				<span className="feature-emoji" aria-hidden>
					{feature.emoji}
				</span>
				<span className={`feature-pill ${feature.tag}`}>{feature.tag}</span>
			</div>
			<h3>{feature.title}</h3>
			<p>{feature.description}</p>
		</button>
	);
};

const FeatureDetails = () => {
	const activeFeature = useFeatureStore((state) => state.activeFeature);
	const feature = features.find((item) => item.title === activeFeature);

	if (!feature) return null;

	return (
		<div className="feature-details">
			<h4>当前焦点：{feature.title}</h4>
			<p>{feature.detail}</p>
		</div>
	);
};

const StatsPanel = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["demo", "stats"],
		queryFn: fetchShowcaseStats,
		staleTime: 1000 * 60,
	});

	return (
		<section className="stats-panel">
			<header>
				<div>
					<h3>体验数据</h3>
					<p>由 React Query 提供的伪实时指标</p>
				</div>
				{isLoading && <span className="loading-dot">同步中…</span>}
			</header>
			<div className="stats-grid">
				{data?.map((stat) => (
					<div key={stat.label} className="stat-card">
						<div className="stat-value">{stat.value}</div>
						<div className="stat-label">{stat.label}</div>
						<p>{stat.hint}</p>
					</div>
				))}
			</div>
		</section>
	);
};

const queryClient = new QueryClient();

const App = () => {
	const { electron, chrome, node } = window.desktopBridge.getVersions();

	return (
		<div className="app-shell">
			<div className="glow" aria-hidden />
			<nav className="app-nav">
				<div className="brand">
					<span>Shadcn + Electron</span>
					<small>React · Query · Zust</small>
				</div>
				<ThemeToggle />
			</nav>

			<header>
				<h1>构建一个有态度的桌面体验</h1>
				<p>
					集成 next-themes、@tanstack/react-query 与 zustand，向你展示如何在
					Electron 模板中快速组合多主题、数据与状态。
				</p>
			</header>

			<section className="status-bar">
				<StatusBadge label="Electron" value={electron} />
				<StatusBadge label="Chromium" value={chrome} />
				<StatusBadge label="Node.js" value={node} />
			</section>

			<section className="feature-grid">
				{features.map((feature) => (
					<FeatureCard key={feature.title} feature={feature} />
				))}
			</section>

			<FeatureDetails />
			<StatsPanel />

			<section className="cta">
				<h2>下一步想做什么？</h2>
				<div className="cta-actions">
					<button type="button" className="primary">
						打开技术栈文档
					</button>
					<button type="button" className="secondary">
						试试自定义主题
					</button>
				</div>
			</section>
		</div>
	);
};

const Providers = () => (
	<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</ThemeProvider>
);

const container = document.getElementById("root");

if (!container) {
	throw new Error("根节点 #root 缺失，请检查 index.html");
}

const root = createRoot(container);
root.render(<Providers />);
