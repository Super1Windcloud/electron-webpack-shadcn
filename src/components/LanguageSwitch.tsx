import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
	{ code: "zh", label: "中文" },
	{ code: "en", label: "English" },
];

export const LanguageSwitch: React.FC = () => {
	const { i18n, t } = useTranslation();
	return (
		<div className="language-switch">
			<span>{t("language")}:</span>
			<div className="language-options">
				{languages.map((lang) => (
					<button
						type="button"
						key={lang.code}
						onClick={() => i18n.changeLanguage(lang.code)}
						className={
							i18n.language === lang.code ? "active language-btn" : "language-btn"
						}
					>
						{lang.label}
					</button>
				))}
			</div>
		</div>
	);
};
