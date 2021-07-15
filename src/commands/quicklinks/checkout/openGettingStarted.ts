import * as vscode from 'vscode';

export default () => {
	vscode.env.openExternal(
		vscode.Uri.parse(
			'https://developers.mypos.eu/en/doc/online_payments/291-checkout-getting-started',
		),
	);
};
