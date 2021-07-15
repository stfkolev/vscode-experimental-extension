// vscode.window.createTreeView('myposSamplesView', {
// 	treeDataProvider: new Providers.MyposSamplesViewProvider(),
// 	showCollapseAll: false,
// });

// vscode.window.createTreeView('myposQuickLinksView', {
// 	treeDataProvider: new Providers.MyposQuickLinksViewProvider(),
// 	showCollapseAll: false,
// });

// vscode.window.createTreeView('myposRecentUpdatesView', {
// 	treeDataProvider: new Providers.MyposRecentUpdatesViewProvider(),
// 	showCollapseAll: false,
// });

export { default as createTreeView } from './createTreeView';
export { default as formatSeconds } from './formatSeconds';
export { default as getExtensionInfo } from './getExtensionInfo';
