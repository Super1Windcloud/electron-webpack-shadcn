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
		<section className="insights-grid">
			<div className="insight-card">
				<h2>{t("insights.title")}</h2>
				<p>{t("insights.description")}</p>
				<ul>
					{checklist.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</div>
			<div className="insight-card metrics">
				<h3>Query snapshot</h3>
				<div className="stats-grid compact">
					{data?.map((stat) => (
						<div key={stat.label} className="stat-card">
							<div className="stat-value">{stat.value}</div>
							<div className="stat-label">{stat.label}</div>
							<p>{stat.hint}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export const Route = createRoute({
	getParentRoute: () => RootRoute,
	path: "/insights",
	component: InsightsRoute,
});
