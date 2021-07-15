import { Event, EventEmitter, TreeDataProvider, TreeItem } from 'vscode';
import { MyposTreeItem } from './MyposTreeItem';

export class MyposTreeViewDataProvider implements TreeDataProvider<TreeItem> {
	private treeItems: TreeItem[] | null = null;

	private _onDidChangeTreeData: EventEmitter<
		TreeItem | undefined | null | void
	> = new EventEmitter<TreeItem | null>();

	readonly onDidChangeTreeData: Event<TreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	public refresh() {
		this.treeItems = null;
		this._onDidChangeTreeData.fire();
	}

	public getTreeItem(element: TreeItem): TreeItem {
		return element;
	}

	public getParent(element: TreeItem): TreeItem | null {
		if (element instanceof MyposTreeItem && element.parent) {
			return element.parent;
		}
		return null;
	}

	public async getChildren(element?: TreeItem): Promise<TreeItem[]> {
		if (!this.treeItems) {
			this.treeItems = await this.buildTree();
		}

		if (element instanceof MyposTreeItem) {
			return element.children;
		}

		if (!element) {
			if (this.treeItems) {
				return this.treeItems;
			}
		}
		return [];
	}

	buildTree(): Promise<MyposTreeItem[]> {
		return Promise.resolve([]);
	}
}
