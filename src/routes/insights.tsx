import React from "react";
import { createRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { Route as RootRoute } from "./__root";
import { fetchShowcaseStats } from "../lib/demoData";

const InsightsRoute = () => {
	const { t } = useTranslation();
	const { data } = useQuery({
		queryKey: ["demo", "stats"],
		queryFn: fetchShowcaseStats,
		staleTime: 1000 * 60,
	});

	const checklist = t("insights.list", { returnObjects: true }) as string[];

	return (
		<section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
			<article className="rounded-3xl border border-border/60 bg-card/80 px-6 py-6 shadow-md">
				<h2 className="text-2xl font-semibold">{t("insights.title")}</h2>
				<p className="mt-3 text-sm text-muted-foreground">
					{t("insights.description")}
				</p>
				<ul className="mt-6 space-y-3 text-sm text-muted-foreground">
					{checklist.map((item) => (
						<li key={item} className="flex items-start gap-3">
							<span className="mt-1 size-2.5 rounded-full bg-primary" />
							<span>{item}</span>
						</li>
					))}
				</ul>
			</article>
			<article className="rounded-3xl border border-border/60 bg-card/80 px-6 py-6 shadow-md">
				<h3 className="text-lg font-semibold">Query snapshot</h3>
				<div className="mt-4 grid gap-4 sm:grid-cols-2">
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
			</article>
		</section>
	);
};

export const Route = createRoute({
	getParentRoute: () => RootRoute,
	path: "/insights",
	component: InsightsRoute,
});
