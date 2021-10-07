// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as Providers from './providers';
import * as Commands from './commands';
import { Samples } from './models/Samples';
import {
	authorizationHeaders,
	createTreeView,
	getExtensionInfo,
} from './utils';
import axios from 'axios';
import { Snippet } from './models/Snippet';
import { Language } from './models/Language';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// https://gist.githubusercontent.com/stefan-kolev-mypos/8820e05c925455a126dbfa624c722d4b/raw/2c1d7c988ed87e0c50a5bf1e812b1b9b8c0c23b8/snippets.json
	axios
		.get('https://api.github.com/gists/8820e05c925455a126dbfa624c722d4b', {
			headers: authorizationHeaders,
		})
		.then((result) => {
			console.log(result);
			const languages = JSON.parse(
				result.data.files['snippets.json'].content,
			) as Language[];

			for (const elem of languages) {
				const provider = vscode.languages.registerCompletionItemProvider(
					elem.name,
					{
						provideCompletionItems(
							document: vscode.TextDocument,
							position: vscode.Position,
							token: vscode.CancellationToken,
							context: vscode.CompletionContext,
						) {
							// a completion item that inserts its text as snippet,
							// the `insertText`-property is a `SnippetString` which will be
							// honored by the editor.
							const completionItems = [];

							for (const element of elem.snippets) {
								const snippetCompletion = new vscode.CompletionItem(
									'myPOS_' + element.name,
								);

								snippetCompletion.insertText = new vscode.SnippetString(
									element.snippet,
								);

								snippetCompletion.documentation = new vscode.MarkdownString(
									element.help,
								);

								snippetCompletion.detail = element.help;

								completionItems.push(snippetCompletion);
							}

							// // return all completion items as array
							return completionItems;
						},
					},
				);

				context.subscriptions.push(provider);
			}
		});

	const statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
	);

	statusBarItem.tooltip =
		'You are currently using myPOS Explorer Version 0.0.1';
	statusBarItem.text = 'myPOS v0.0.1';
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

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const commandCallbackPairs: [string, (...args: any[]) => any][] = [
		['mypos.recentUpdates.refresh', () => RecentUpdatesProvider.refresh()],
		[
			'mypos.openReportIssue',
			() => {
				Commands.openReportIssue();
			},
		],
		[
			'mypos.createMyposSample',
			() => {
				Commands.createSample(new Samples());
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
		['mypos.openClockDocs', () => Commands.quicklinks.openClockDocs()],

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
