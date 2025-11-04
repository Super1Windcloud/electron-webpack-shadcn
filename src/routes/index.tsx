import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { createRoute } from "@tanstack/react-router";
import { Palette, Puzzle, Zap, type LucideIcon } from "lucide-react";

import { Route as RootRoute } from "./__root";
import { StatusBadge } from "../components/StatusBadge";
import { fetchShowcaseStats } from "../lib/demoData";
import { cn } from "../lib/utils";

type FeatureEntry = {
	key: "speed" | "themes" | "native";
	Icon: LucideIcon;
	badgeClass: string;
};

const featureEntries: FeatureEntry[] = [
	{
		key: "speed",
		Icon: Zap,
		badgeClass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
	},
	{
		key: "themes",
		Icon: Palette,
		badgeClass: "border-sky-500/40 bg-sky-500/10 text-sky-500",
	},
	{
		key: "native",
		Icon: Puzzle,
		badgeClass: "border-amber-500/40 bg-amber-500/10 text-amber-500",
	},
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
		<div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-background px-6 py-5 shadow-md">
			<h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
				{t("features.active")} · {title}
			</h4>
			<p className="mt-3 text-base leading-relaxed text-foreground/90">{detail}</p>
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
		<section className="rounded-3xl border border-border/60 bg-card/80 px-6 py-5 shadow-md">
			<header className="flex items-center justify-between gap-4">
				<div>
					<h3 className="text-lg font-semibold">{t("features.title")}</h3>
					<p className="text-sm text-muted-foreground">
						{t("features.statsSubtitle")}
					</p>
				</div>
				{isLoading && (
					<span className="text-2xl leading-none text-muted-foreground animate-pulse">
						•
					</span>
				)}
			</header>
			<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{data?.map((stat) => (
					<div
						key={stat.label}
						className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 shadow-sm"
					>
						<div className="text-2xl font-semibold">{stat.value}</div>
						<div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
							{stat.label}
						</div>
						<p className="text-sm text-muted-foreground">{stat.hint}</p>
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
		<div className="space-y-10">
			<header className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-card to-secondary/10 px-8 py-10 text-center shadow-lg md:text-left">
				<h1 className="text-3xl font-bold tracking-tight">{t("app.title")}</h1>
				<p className="mt-3 text-base text-muted-foreground">{t("app.subtitle")}</p>
			</header>

			<section className="grid gap-4 md:grid-cols-3">
				<StatusBadge label="Electron" value={electron} />
				<StatusBadge label="Chromium" value={chrome} />
				<StatusBadge label="Node.js" value={node} />
			</section>

			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{featureEntries.map((entry) => {
					const IconComponent = entry.Icon;
					const title = t(`features.items.${entry.key}.title`);
					const description = t(`features.items.${entry.key}.description`);
					const tagLabel = t(`features.items.${entry.key}.tag`);

					return (
						<button
							type="button"
							key={entry.key}
							onClick={() => setActiveKey(entry.key)}
							className={cn(
								"group flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-card/80 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
								activeKey === entry.key &&
									"border-primary bg-primary/10 text-foreground shadow-lg"
							)}
						>
							<div className="flex items-center justify-between">
								<IconComponent className="size-5 text-primary" aria-hidden />
								<span
									className={cn(
										"rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
										entry.badgeClass
									)}
								>
									{tagLabel}
								</span>
							</div>
							<h3 className="text-xl font-semibold">{title}</h3>
							<p className="text-sm text-muted-foreground">{description}</p>
						</button>
					);
				})}
			</section>

			<div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
				<FeatureDetails />
				<StatsPanel />
			</div>

			<section className="rounded-3xl border border-border/60 bg-gradient-to-r from-primary/15 via-background to-secondary/15 px-8 py-10 text-center shadow-lg">
				<h2 className="text-2xl font-semibold">{t("app.title")}</h2>
				<div className="mt-6 flex flex-wrap items-center justify-center gap-4">
					<button
						type="button"
						className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
					>
						{t("app.ctaPrimary")}
					</button>
					<button
						type="button"
						className="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
					>
						{t("app.ctaSecondary")}
					</button>
				</div>
			</section>
		</div>
	);
};

export const Route = createRoute({
	getParentRoute: () => RootRoute,
	path: "/",
	component: OverviewRoute,
});
