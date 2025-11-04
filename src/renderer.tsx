import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import {
	RouterProvider,
	createRouter,
	createHashHistory,
} from "@tanstack/react-router";

import "./index.css";
import i18n from "./i18n";
import { routeTree } from "./routes/routeTree";

type DesktopBridge = {
	getVersions: () => {
		electron: string;
		chrome: string;
		node: string;
	};
	window: {
		minimize: () => Promise<void>;
		toggleMaximize: () => Promise<void>;
		close: () => Promise<void>;
	};
};

declare global {
	interface Window {
		desktopBridge: DesktopBridge;
	}
}

const queryClient = new QueryClient();

const router = createRouter({
	history: createHashHistory(),
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
	 
	interface Register {
		router: typeof router;
	}
}

const Providers: React.FC = () => (
	<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
		<I18nextProvider i18n={i18n}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</I18nextProvider>
	</ThemeProvider>
);

const container = document.getElementById("root");

if (!container) {
	throw new Error("根节点 #root 缺失，请检查 index.html");
}

const root = createRoot(container);
root.render(<Providers />);
