import * as vscode from 'vscode';

export default () => {
	vscode.env.openExternal(
		vscode.Uri.parse(
			'https://developers.mypos.eu/en/doc/online_payments/v1_4/312-prestashop',
		),
	);
};
