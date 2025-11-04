import React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "../lib/utils";

const languages = [
	{ code: "zh", label: "中文" },
	{ code: "en", label: "English" },
];

export const LanguageSwitch: React.FC = () => {
	const { i18n, t } = useTranslation();
	const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

	return (
		<div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
			<span>{t("language")}:</span>
			<div className="flex items-center gap-1 rounded-full border border-border/50 bg-muted/70 p-1">
				{languages.map((lang) => {
					const isActive = currentLanguage === lang.code;
					return (
						<button
							type="button"
							key={lang.code}
							onClick={() => i18n.changeLanguage(lang.code)}
							className={cn(
								"inline-flex min-w-[3.5rem] items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
								isActive
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							)}
						>
							{lang.label}
						</button>
					);
				})}
			</div>
		</div>
	);
};
