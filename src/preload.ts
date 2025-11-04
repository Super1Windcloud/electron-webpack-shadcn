import { contextBridge } from "electron";

const versions = {
	electron: process.versions.electron,
	chrome: process.versions.chrome,
	node: process.versions.node,
};

contextBridge.exposeInMainWorld("desktopBridge", {
	getVersions: () => versions,
});
