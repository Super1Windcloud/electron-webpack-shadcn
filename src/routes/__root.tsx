import React from "react";
import {
	Link,
	Outlet,
	createRootRoute,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSwitch } from "../components/LanguageSwitch";
import "../index.css";

const NotFoundView = () => {
	const { t } = useTranslation();
	return (
		<section className="not-found-card">
			<h2>404</h2>
			<p>{t("app.nav.home")} / {t("app.nav.insights")} 之外的路径暂未实现。</p>
			<Link to="/" className="router-link active">
				返回 {t("app.nav.home")}
			</Link>
		</section>
	);
};

const RootComponent = () => {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<div className="app-shell">
			<div className="glow" aria-hidden />
			<div className="app-nav">
				<div className="brand">
					<span>Shadcn + Electron</span>
					<small>React · Query · Router · Zustand</small>
				</div>
				<div className="nav-actions">
					<LanguageSwitch />
					<ThemeToggle />
				</div>
			</div>

			<nav className="router-nav">
				<Link
					to="/"
					className="router-link"
					activeOptions={{ exact: true }}
					activeProps={{ className: "router-link active" }}
				>
					{t("app.nav.home")}
				</Link>
				<Link
					to="/insights"
					className="router-link"
					activeProps={{ className: "router-link active" }}
				>
					{t("app.nav.insights")}
				</Link>
			</nav>

			<Outlet />
			{process.env.NODE_ENV !== "production" ? (
				<TanStackRouterDevtools router={router} />
			) : null}
		</div>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFoundView,
});
