import * as vscode from 'vscode';
import { MyposTreeViewDataProvider } from '../abstract/MyposTreeViewDataProvider';

export default (
	treeViewName: string,
	provider: MyposTreeViewDataProvider,
	showCollapseAll: boolean,
) => {
	vscode.window.createTreeView(treeViewName, {
		treeDataProvider: provider,
		showCollapseAll: showCollapseAll,
	});
};
