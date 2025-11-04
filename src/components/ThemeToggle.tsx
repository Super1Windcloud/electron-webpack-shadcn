import { useTheme } from "next-themes";
import React from "react";

export const ThemeToggle: React.FC = () => {
	const { theme, systemTheme, setTheme } = useTheme();
	const resolvedTheme = (theme === "system" ? systemTheme : theme) ?? "light";
	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			<span aria-hidden>{isDark ? "🌙" : "☀️"}</span>
			<span>{isDark ? "深色模式" : "浅色模式"}</span>
		</button>
	);
};
