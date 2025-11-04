import { useTheme } from "next-themes";
import React from "react";

export const ThemeToggle: React.FC = () => {
	const { theme, systemTheme, setTheme } = useTheme();
	const resolvedTheme = (theme === "system" ? systemTheme : theme) ?? "light";
	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-sm transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			<span
				aria-hidden
				className="text-base leading-none"
				role="presentation"
			>
				{isDark ? "🌙" : "☀️"}
			</span>
			<span>{isDark ? "深色模式" : "浅色模式"}</span>
		</button>
	);
};
