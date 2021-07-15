import { MyposTreeViewDataProvider } from '../abstract/MyposTreeViewDataProvider';
import { ThemeIcon } from 'vscode';
import { MyposTreeItem } from '../abstract/MyposTreeItem';

export class MyposHelpAndFeedbackViewProvider extends MyposTreeViewDataProvider {
	buildTree(): Promise<MyposTreeItem[]> {
		const items = [];

		const openWebsiteItem = new MyposTreeItem('Open Developers Portal', {
			commandString: 'openDevelopersPortal',
			iconPath: new ThemeIcon('link-external'),
		});
		items.push(openWebsiteItem);

		const writeTicketItem = new MyposTreeItem('Write us a ticket', {
			commandString: 'openReportIssue',
			iconPath: new ThemeIcon('output-view-icon'),
		});
		items.push(writeTicketItem);

		const reportItem = new MyposTreeItem('Report issue', {
			commandString: 'openReportIssue',
			iconPath: new ThemeIcon('report'),
		});
		items.push(reportItem);

		return Promise.resolve(items);
	}
}
