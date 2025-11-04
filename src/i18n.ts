import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			app: {
				title: "Craft a bold desktop experience",
				subtitle:
					"Mix next-themes, TanStack Router, React Query, and Zustand to ship multi-language, multi-theme flows quickly.",
				ctaPrimary: "Open documentation",
				ctaSecondary: "Customize themes",
				nav: {
					home: "Overview",
					insights: "Insights",
				},
			},
			features: {
				title: "Highlights",
				statsSubtitle: "Metrics powered by React Query",
				active: "Current focus",
				items: {
					speed: {
						title: "Velocity first",
						description: "Hot reload + React Query equals instant feedback loops.",
						detail:
							"React Query shares cache between windows while Zustand syncs state, so designer tweaks and data refreshes never block each other.",
						tag: "prod-ready",
					},
					themes: {
						title: "Multi-theme native feel",
						description: "next-themes keeps system preference in sync with CSS variables.",
						detail:
							"ThemeProvider stores preferences per user while TanStack Router transitions keep lights on.",
						tag: "design",
					},
					native: {
						title: "Orchestrated state",
						description: "Zustand handles global UI slices without reducers.",
						detail:
							"Use slices for navigation, dialogues, and offline banners while Router composes nested layouts.",
						tag: "state",
					},
				},
			},
			insights: {
				title: "Insights & Playbook",
				description:
					"Combine TanStack Router layouts with Zustand slices to orchestrate flows, and leave freshness to React Query.",
				list: [
					"Use router context to share the QueryClient anywhere.",
					"Persist i18n + theme preference via next-themes and i18next.",
					"Drive complex modals through lightweight Zustand stores.",
				],
			},
			language: "Language",
		},
	},
	zh: {
		translation: {
			app: {
				title: "构建一个有态度的桌面体验",
				subtitle:
					"结合 next-themes、TanStack Router、React Query 与 Zustand，几分钟内完成多语言、多主题的高级交互。",
				ctaPrimary: "打开技术栈文档",
				ctaSecondary: "试试自定义主题",
				nav: {
					home: "概览",
					insights: "洞察",
				},
			},
			features: {
				title: "特色亮点",
				statsSubtitle: "由 React Query 提供的体验指标",
				active: "当前焦点",
				items: {
					speed: {
						title: "极速开发",
						description: "热重载 + React Query 让反馈循环立即可见。",
						detail:
							"React Query 在窗口之间共享缓存，Zustand 同步 UI 状态，保持设计试验与数据刷新互不阻塞。",
						tag: "prod-ready",
					},
					themes: {
						title: "多主题沉浸体验",
						description: "next-themes 与系统偏好实时同步 CSS 变量。",
						detail:
							"ThemeProvider 记住用户选择，而 TanStack Router 提供平滑的布局过渡。",
						tag: "design",
					},
					native: {
						title: "状态驱动界面",
						description: "Zustand 以极小成本维护全局 UI 切片。",
						detail:
							"将导航、弹窗、离线 Banner 等拆分为 store 切片，再由 Router 串联复合场景。",
						tag: "state",
					},
				},
			},
			insights: {
				title: "洞察与实践",
				description:
					"用 TanStack Router + Zustand 编排流转，再通过 React Query 保持数据实时。",
				list: [
					"使用 router context 共享 QueryClient，任何路由都能直接访问。",
					"next-themes + i18next 持久化主题与语言偏好。",
					"以轻量的 Zustand store 管理弹窗和提示条。",
				],
			},
			language: "语言",
		},
	},
} as const;

i18n.use(initReactI18next).init({
	resources,
	lng: "zh",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
