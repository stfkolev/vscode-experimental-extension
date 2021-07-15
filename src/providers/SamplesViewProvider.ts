import { MyposTreeItem } from '../abstract/MyposTreeItem';
import { MyposTreeViewDataProvider } from '../abstract/MyposTreeViewDataProvider';
import { ThemeIcon } from 'vscode';

export class MyposSamplesViewProvider extends MyposTreeViewDataProvider {
	buildTree(): Promise<MyposTreeItem[]> {
		const items = [];

		const samplesItem = new MyposTreeItem('Start with a myPOS Sample', {
			commandString: 'createMyposSample',
			iconPath: new ThemeIcon('repo-clone'),
			tooltip: 'Clone a sample integration built by Mypos',
			contextValue: 'samplesItem',
		});

		items.push(samplesItem);

		return Promise.resolve(items);
	}
}
