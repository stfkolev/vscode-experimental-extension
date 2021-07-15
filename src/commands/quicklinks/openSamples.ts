import * as vscode from 'vscode';

export default () => {
	vscode.env.openExternal(
		vscode.Uri.parse('https://github.com/developermypos'),
	);
};
