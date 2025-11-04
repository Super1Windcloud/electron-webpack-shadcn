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
import { WindowControls } from "../components/WindowControls";
import "../index.css";

const navLinkBase =
	"inline-flex items-center rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const navLinkActive = `${navLinkBase} border-border bg-muted/70 text-foreground shadow-sm`;

const NotFoundView = () => {
	const { t } = useTranslation();
	return (
		<section className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded-3xl border border-dashed border-border/70 bg-card/80 px-6 py-8 text-center shadow-lg">
			<h2 className="text-4xl font-black">404</h2>
			<p className="text-sm text-muted-foreground">
				{t("app.nav.home")} / {t("app.nav.insights")} 之外的路径暂未实现。
			</p>
			<Link
				to="/"
				className="inline-flex items-center justify-center rounded-full border border-transparent bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
			>
				返回 {t("app.nav.home")}
			</Link>
		</section>
	);
};

const RootComponent = () => {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background/95 to-background px-4 py-6 text-foreground sm:px-8 lg:px-12">
			<div
				className="pointer-events-none absolute inset-x-10 top-[-6rem] h-72 rounded-full bg-primary/25 blur-[140px]"
				aria-hidden
			/>
			<div className="relative flex flex-col gap-6">
				<div
					className="relative flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/80 px-6 py-5 shadow-lg backdrop-blur"
					style={{ WebkitAppRegion: "drag" }}
				>
					<div className="space-y-1 text-left select-none pr-32">
						<span className="text-lg font-semibold tracking-tight">
							Shadcn + Electron
						</span>
						<small className="text-sm text-muted-foreground">
							React · Query · Router · Zustand
						</small>
					</div>
					<div
						className="flex flex-wrap items-center justify-end gap-3"
						style={{ WebkitAppRegion: "no-drag" }}
					>
						<LanguageSwitch />
						<ThemeToggle />
					</div>
					<div
						className="absolute right-4 top-4 flex"
						style={{ WebkitAppRegion: "no-drag" }}
					>
						<WindowControls />
					</div>
				</div>

				<nav className="flex flex-wrap gap-3 rounded-full border border-border/50 bg-card/70 px-3 py-2 shadow-sm backdrop-blur">
					<Link
						to="/"
						className={navLinkBase}
						activeOptions={{ exact: true }}
						activeProps={{ className: navLinkActive }}
					>
						{t("app.nav.home")}
					</Link>
					<Link
						to="/insights"
						className={navLinkBase}
						activeProps={{ className: navLinkActive }}
					>
						{t("app.nav.insights")}
					</Link>
				</nav>

				<main className="relative">
					<Outlet />
				</main>
			</div>

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
