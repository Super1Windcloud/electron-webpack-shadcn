import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createRoute } from "@tanstack/react-router";
import { Palette, Puzzle, Zap, type LucideIcon } from "lucide-react";

import { Route as RootRoute } from "./__root";
import { StatusBadge } from "../components/StatusBadge";
import { fetchShowcaseStats } from "../lib/demoData";

type FeatureEntry = {
	key: "speed" | "themes" | "native";
	Icon: LucideIcon;
	tag: string;
};

const featureEntries: FeatureEntry[] = [
	{ key: "speed", Icon: Zap, tag: "prod-ready" },
	{ key: "themes", Icon: Palette, tag: "design" },
	{ key: "native", Icon: Puzzle, tag: "state" },
];

type FeatureState = {
	activeKey: FeatureEntry["key"];
	setActive: (key: FeatureEntry["key"]) => void;
};

const useFeatureStore = create<FeatureState>((set) => ({
	activeKey: "speed",
	setActive: (key) => set({ activeKey: key }),
}));

const FeatureDetails = () => {
	const { t } = useTranslation();
	const activeKey = useFeatureStore((state) => state.activeKey);
	const detail = t(`features.items.${activeKey}.detail`);
	const title = t(`features.items.${activeKey}.title`);

	return (
		<div className="feature-details">
			<h4>
				{t("features.active")}：{title}
			</h4>
			<p>{detail}</p>
		</div>
	);
};

const StatsPanel = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery({
		queryKey: ["demo", "stats"],
		queryFn: fetchShowcaseStats,
		staleTime: 1000 * 60,
	});

	return (
		<section className="stats-panel">
			<header>
				<div>
					<h3>{t("features.title")}</h3>
					<p>{t("features.statsSubtitle")}</p>
				</div>
				{isLoading && <span className="loading-dot">…</span>}
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

const OverviewRoute = () => {
	const { t } = useTranslation();
	const { electron, chrome, node } = window.desktopBridge.getVersions();
	const activeKey = useFeatureStore((state) => state.activeKey);
	const setActiveKey = useFeatureStore((state) => state.setActive);

	return (
		<>
			<header>
				<h1>{t("app.title")}</h1>
				<p>{t("app.subtitle")}</p>
			</header>

			<section className="status-bar">
				<StatusBadge label="Electron" value={electron} />
				<StatusBadge label="Chromium" value={chrome} />
				<StatusBadge label="Node.js" value={node} />
			</section>

			<section className="feature-grid">
				{featureEntries.map((entry) => {
					const IconComponent = entry.Icon;
					const title = t(`features.items.${entry.key}.title`);
					const description = t(`features.items.${entry.key}.description`);
					return (
						<button
							type="button"
							key={entry.key}
							onClick={() => setActiveKey(entry.key)}
							className={`feature-card ${
								activeKey === entry.key ? "active" : ""
							}`}
						>
							<div className="feature-card-header">
								<IconComponent className="feature-icon" aria-hidden />
								<span className={`feature-pill ${entry.tag}`}>{entry.tag}</span>
							</div>
							<h3>{title}</h3>
							<p>{description}</p>
						</button>
					);
				})}
			</section>

			<FeatureDetails />
			<StatsPanel />

			<section className="cta">
				<h2>{t("app.title")}</h2>
				<div className="cta-actions">
					<button type="button" className="primary">
						{t("app.ctaPrimary")}
					</button>
					<button type="button" className="secondary">
						{t("app.ctaSecondary")}
					</button>
				</div>
			</section>
		</>
	);
};

export const Route = createRoute({
	getParentRoute: () => RootRoute,
	path: "/",
	component: OverviewRoute,
});
