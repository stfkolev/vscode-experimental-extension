import * as vscode from 'vscode';

export default () => {
	const extension = vscode.extensions.getExtension('mypos.vscode-mypos');

	if (extension) {
		return extension.packageJSON;
	}

	return {};
};
