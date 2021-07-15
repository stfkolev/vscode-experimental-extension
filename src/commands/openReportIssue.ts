import * as vscode from 'vscode';
import { getExtensionInfo } from '../utils';

export default () => {
	const { name, publisher } = getExtensionInfo();

	vscode.commands.executeCommand('vscode.openIssueReporter', {
		extensionId: `${publisher}.${name}`,
	});
};
