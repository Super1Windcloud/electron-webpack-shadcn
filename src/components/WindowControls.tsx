import React from "react";
import { Minus, Square, X } from "lucide-react";

type ControlAction = "minimize" | "toggleMaximize" | "close";

const controlConfig: Array<{
	key: ControlAction;
	icon: React.ReactNode;
	label: string;
	className?: string;
}> = [
	{
		key: "minimize",
		icon: <Minus className="size-4" aria-hidden />,
		label: "最小化",
	},
		{
			key: "toggleMaximize",
			icon: <Square className="size-3.5" aria-hidden />,
			label: "最大化 / 还原",
		},
	{
		key: "close",
		icon: <X className="size-4" aria-hidden />,
		label: "关闭",
		className:
			"text-red-500 hover:bg-red-500/10 hover:text-red-500 focus-visible:ring-red-500",
	},
];

export const WindowControls: React.FC = () => {
	const [isMaximized, setIsMaximized] = React.useState(false);

	const handleAction = async (action: ControlAction) => {
		await window.desktopBridge.window[action]();
		if (action === "toggleMaximize") {
			setIsMaximized((prev) => !prev);
		}
	};

	return (
		<div
			className="flex items-center gap-1"
			style={{ WebkitAppRegion: "no-drag" }}
		>
			{controlConfig.map((control) => (
				<button
					type="button"
					key={control.key}
					onClick={() => handleAction(control.key)}
					className={`group flex size-9 items-center justify-center rounded-xl border border-transparent text-muted-foreground transition hover:border-border/60 hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${control.className ?? ""}`}
				>
					{control.key === "toggleMaximize" && isMaximized ? (
						<span
							className="text-[10px] font-semibold leading-none"
							aria-hidden
						>
							▢
						</span>
					) : (
						control.icon
					)}
						<span className="sr-only">
							{control.label}
							{control.key === "toggleMaximize" && isMaximized
								? "（已最大化）"
								: ""}
						</span>
				</button>
			))}
		</div>
	);
};
