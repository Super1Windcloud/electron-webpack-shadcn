import React from "react";

type Props = {
	label: string;
	value: string;
};

export const StatusBadge: React.FC<Props> = ({ label, value }) => (
	<div className="flex w-full items-center justify-between rounded-2xl border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-sm">
		<span>{label}</span>
		<span className="text-sm text-foreground">{value}</span>
	</div>
);
