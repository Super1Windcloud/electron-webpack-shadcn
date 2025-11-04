import React from "react";

type Props = {
	label: string;
	value: string;
};

export const StatusBadge: React.FC<Props> = ({ label, value }) => (
	<div className="status-badge">
		<span className="status-label">{label}</span>
		<span className="status-value">{value}</span>
	</div>
);
