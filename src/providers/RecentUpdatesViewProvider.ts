import { MyposTreeItem } from '../abstract/MyposTreeItem';
import { MyposTreeViewDataProvider } from '../abstract/MyposTreeViewDataProvider';
import { ThemeIcon, window } from 'vscode';
import axios from 'axios';
import * as moment from 'moment';
import { authorizationHeaders } from '../utils';

export class MyposRecentUpdatesViewProvider extends MyposTreeViewDataProvider {
	refresh(): Thenable<MyposTreeItem[]> {
		return this.loadItems();
	}

	buildTree(): Promise<MyposTreeItem[]> {
		return this.loadItems();
	}

	loadItems() {
		return axios
			.get('https://api.github.com/users/developermypos/repos', {
				headers: authorizationHeaders,
			})
			.then(async (response) => {
				const items: any[] = [];

				for (const element of response.data) {
					const result = await axios.get(element.tags_url, {
						headers: authorizationHeaders,
					});

					const repoItem = new MyposTreeItem(`${element.name}`, {
						iconPath: new ThemeIcon('source-control-view-icon'),
						description: `${
							result.data.length === 0
								? `Last updated ${moment(element.updated_at).fromNow()}`
								: `${result.data[0].name} (Last updated ${moment(
										element.updated_at,
								  ).fromNow()})`
						}`,
					});

					items.push(repoItem);
				}

				return items;
			})
			.catch((exception) => {
				if (exception.status_code == 403) {
					const timeDifference =
						exception.response.headers['x-ratelimit-reset'] * 1000 -
						new Date(exception.response.headers['date']).getTime();

					window.showErrorMessage(
						`myPOS Recent Updates: ${
							exception.message
						}.\n\nThere was an error making requests to the myPOS's Github repositories.\n\n Auto-refresh will be available in ${new Date(
							timeDifference,
						)
							.toISOString()
							.slice(-13, -5)}`,
					);

					setTimeout(() => this.loadItems(), timeDifference);
				}
				return [];
			});
	}
}
