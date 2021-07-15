// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as Providers from './providers';
import * as Commands from './commands';

import { createTreeView } from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "mypos" is now active!');

	const statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left,
	);
	statusBarItem.tooltip = 'Timer';
	statusBarItem.command = '';
	statusBarItem.show();

	const SamplesProvider = new Providers.MyposSamplesViewProvider();
	const QuickLinksProvider = new Providers.MyposQuickLinksViewProvider();
	const RecentUpdatesProvider = new Providers.MyposRecentUpdatesViewProvider();
	const HelpAndFeedbackProvider =
		new Providers.MyposHelpAndFeedbackViewProvider();

	createTreeView('myposSamplesView', SamplesProvider, false);
	createTreeView('myposQuickLinksView', QuickLinksProvider, false);
	createTreeView('myposRecentUpdatesView', RecentUpdatesProvider, false);
	createTreeView('myposHelpAndFeedbackView', HelpAndFeedbackProvider, false);

	console.log(Commands);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const commandCallbackPairs: [string, (...args: any[]) => any][] = [
		['mypos.helloWorld', () => Commands.helloWorld()],
		['mypos.recentUpdates.refresh', () => RecentUpdatesProvider.refresh()],
		[
			'mypos.openReportIssue',
			() => {
				Commands.openReportIssue();
			},
		],
		[
			'mypos.openSamples',
			() => {
				Commands.quicklinks.openSamples();
			},
		],
		[
			'mypos.openPayButtonsAndLinks',
			() => Commands.quicklinks.openPayButtonsAndLinks(),
		],
		[
			'mypos.openStoreManagementDocs',
			() => Commands.quicklinks.openStoreManagementDocs(),
		],

		// Checkout
		[
			'mypos.openGettingStarted',
			() => Commands.quicklinks.checkout.openGettingStarted(),
		],

		[
			'mypos.openPhpSdkDocs',
			() => Commands.quicklinks.checkout.openPhpSdkDocs(),
		],
		[
			'mypos.openJavaSdkDocs',
			() => Commands.quicklinks.checkout.openJavaSdkDocs(),
		],
		[
			'mypos.openEmbeddedSdkDocs',
			() => Commands.quicklinks.checkout.openEmbeddedSdkDocs(),
		],
		[
			'mypos.openApiReference',
			() => Commands.quicklinks.checkout.openApiReference(),
		],

		// Plug-ins
		[
			'mypos.openCloudCartPlugin',
			() => Commands.quicklinks.plugins.openCloudCartPlugin(),
		],
		[
			'mypos.openGombashopPlugin',
			() => Commands.quicklinks.plugins.openGombashopPlugin(),
		],
		[
			'mypos.openMagentoPlugin',
			() => Commands.quicklinks.plugins.openMagentoPlugin(),
		],
		[
			'mypos.openOpenCartPlugin',
			() => Commands.quicklinks.plugins.openOpenCartPlugin(),
		],
		[
			'mypos.openOsCommerceItemPlugin',
			() => Commands.quicklinks.plugins.openOsCommerceItemPlugin(),
		],
		[
			'mypos.openPrestaShopPlugin',
			() => Commands.quicklinks.plugins.openPrestaShopPlugin(),
		],
		[
			'mypos.openWooCommercePlugin',
			() => Commands.quicklinks.plugins.openWooCommercePlugin(),
		],
		[
			'mypos.openXCartPlugin',
			() => Commands.quicklinks.plugins.openXCartPlugin(),
		],
		[
			'mypos.openZenCartPlugin',
			() => Commands.quicklinks.plugins.openZenCartPlugin(),
		],
	];

	const registeredCommands: vscode.Disposable[] = commandCallbackPairs.map(
		([command, callback]) => vscode.commands.registerCommand(command, callback),
	);

	context.subscriptions.push(...registeredCommands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
