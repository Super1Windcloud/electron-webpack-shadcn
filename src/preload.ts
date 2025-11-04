import { contextBridge, ipcRenderer } from "electron";

const versions = {
	electron: process.versions.electron,
	chrome: process.versions.chrome,
	node: process.versions.node,
};

contextBridge.exposeInMainWorld("desktopBridge", {
	getVersions: () => versions,
	window: {
		minimize: () => ipcRenderer.invoke("window-control", "minimize"),
		toggleMaximize: () =>
			ipcRenderer.invoke("window-control", "toggle-maximize"),
		close: () => ipcRenderer.invoke("window-control", "close"),
	},
});
