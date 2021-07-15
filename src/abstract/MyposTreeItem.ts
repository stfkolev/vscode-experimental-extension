import { TreeItem, TreeItemCollapsibleState } from 'vscode';

type MyposTreeItemOptions = Pick<
	TreeItem,
	'contextValue' | 'tooltip' | 'iconPath' | 'description'
> & {
	/**
	 * The command that should be executed when the tree item is selected.
	 * Automatically prefixed with `'mypos.'`.
	 */
	commandString?: string;
};

export class MyposTreeItem extends TreeItem {
	parent: MyposTreeItem | undefined;
	children: MyposTreeItem[] = [];
	readonly label: string;
	private _metadata: object | undefined;
	private commandString: string | undefined;

	constructor(label: string, options: MyposTreeItemOptions = {}) {
		super(label, TreeItemCollapsibleState.None);
		this.label = label;
		this.contextValue = options.contextValue || 'mypos';
		this.commandString = options.commandString;
		this.iconPath = options.iconPath;
		this.tooltip = options.tooltip;
		this.description = options.description;
		this.metadata = {};
	}

	get metadata() {
		return this._metadata;
	}

	set metadata(data: any) {
		this._metadata = data;
		if (this.commandString) {
			this.command = {
				title: `mypos.${this.commandString}`,
				command: `mypos.${this.commandString}`,
				arguments: [this._metadata],
			};
		}
	}

	makeCollapsible() {
		this.collapsibleState = TreeItemCollapsibleState.Collapsed;
	}

	expand() {
		this.collapsibleState = TreeItemCollapsibleState.Expanded;
	}

	addChild(item: MyposTreeItem) {
		this.children.push(item);

		if (this.children.length) {
			if (this.collapsibleState !== TreeItemCollapsibleState.Expanded) {
				this.collapsibleState = TreeItemCollapsibleState.Collapsed;
			}
		}

		return this;
	}
}
