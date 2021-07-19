import axios from 'axios';
import * as path from 'path';
import * as vscode from 'vscode';
import * as AdmZip from 'adm-zip';
import { Integration } from './Integration';
import { authorizationHeaders, getSampleLanguage } from '../utils';

/**
 * SampleQuickPickItem contains the data for each Sample quick pick item.
 */
type SampleQuickPickItem = vscode.QuickPickItem & {
	sampleData: {
		name: string;
		url: string;
		full_name: string;
	};
};

/**
 * myPOSSamples prompts the user for a myPOS sample and delegates sample creation to the
 * underlying myPOS daemon process.
 */
export class Samples {
	/**
	 * Show a menu with a list of myPOS samples, prompt for sample options, clone the sample, and
	 * prompt to open the sample.
	 */
	selectAndCloneSample = async () => {
		try {
			const selectedSample = await this.promptSample();
			if (!selectedSample) {
				return;
			}

			// const selectedIntegration = await this.promptIntegration(selectedSample);
			// if (!selectedIntegration) {
			// 	return;
			// }

			const selectedClient = await this.promptClient();
			if (!selectedClient) {
				return;
			}

			const clonePath = await this.promptPath(selectedSample);
			if (!clonePath) {
				return;
			}

			const result = await axios.get(
				`${selectedSample.sampleData.url}/zipball/master`,
				{
					headers: {
						authorizationHeaders,
					},
					responseType: 'arraybuffer',
				},
			);

			const zip = new AdmZip(result.data);
			zip.extractAllTo(clonePath, true);

			await this.promptOpenFolder(
				'The sample was successfully created!',
				clonePath,
			);
		} catch (e) {
			vscode.window.showErrorMessage(
				`Cannot create myPOS sample: ${e.message}`,
			);
		}
	};

	/**
	 * Get a list of myPOS Samples items to show in a quick pick menu.
	 */
	private getQuickPickItems = async () => {
		const rawSamples = await axios.get(
			'https://api.github.com/users/mypos-samples/repos',
			{
				headers: authorizationHeaders,
			},
		);

		// alphabetical order
		rawSamples.data.sort((left: any, right: any) => {
			if (left.name < right.name) {
				return -1;
			}

			if (left.name > right.name) {
				return 1;
			}

			return 0;
		});

		const samplesQuickPickItems: SampleQuickPickItem[] = await Promise.all(
			rawSamples.data.map(async (sample: any) => {
				const language = await getSampleLanguage(sample.full_name);

				return {
					label: `$(repo) ${sample.name}`,
					description: `${sample.description}`,
					detail: `$(notebook) Language: ${language}`,
					sampleData: {
						name: sample.name,
						url: sample.url,
						full_name: sample.full_name,
					},
				};
			}),
		);

		return samplesQuickPickItems;
	};

	/**
	 *  Get the available configs for this sample.
	 */
	private async getConfigsForSample(
		sampleName: string,
	): Promise<Integration[]> {
		const integrationLanguage = await getSampleLanguage(sampleName);

		return new Promise((resolve, reject) => {
			// this.daemonClient?.sampleConfigs(request, (error, response) => {
			// 	if (error) {
			// 		reject(error);
			// 	} else if (response) {
			// 		resolve(response.getIntegrationsList());
			// 	}
			// });

			resolve([new Integration(integrationLanguage)]);
		});
	}

	/**
	 * Ask for which sample to clone.
	 */
	private promptSample = async (): Promise<SampleQuickPickItem | undefined> => {
		const selectedSample = await vscode.window.showQuickPick(
			this.getQuickPickItems(),
			{
				matchOnDetail: true,
				title: 'Getting started with myPOS Sample 1/2',
				placeHolder: 'Select a sample to clone',
			},
		);

		return selectedSample;
	};

	/**
	 * Ask for which integration to copy for this sample.
	 */
	// private promptIntegration = async (
	// 	sample: SampleQuickPickItem,
	// ): Promise<Integration | undefined> => {
	// 	const integrationsPromise = this.getConfigsForSample(
	// 		sample.sampleData.full_name,
	// 	);

	// 	// Don't resolve the promise now. Instead, pass the promise to showQuickPick.
	// 	// The quick pick will show a progress indicator while the promise is resolving.
	// 	const getIntegrationNames = async (): Promise<string[]> => {
	// 		return ((await integrationsPromise) || []).map((i) =>
	// 			i.getIntegrationName(),
	// 		);
	// 	};

	// 	const selectedIntegrationName = await vscode.window.showQuickPick(
	// 		getIntegrationNames(),
	// 		{
	// 			title: 'Getting started with myPOS Sample 2/3',
	// 			placeHolder: 'Select an integration',
	// 		},
	// 	);
	// 	if (!selectedIntegrationName) {
	// 		return;
	// 	}

	// 	const integrations = await integrationsPromise;
	// 	if (!integrations) {
	// 		return undefined;
	// 	}

	// 	const selectedIntegration = integrations.find(
	// 		(i) => i.getIntegrationName() === selectedIntegrationName,
	// 	);
	// 	return selectedIntegration;
	// };

	/**
	 * Ask for the sample client language
	 */
	private promptClient = (): Thenable<string | undefined> => {
		return vscode.window.showQuickPick(['Online'], {
			title: 'Getting started with myPOS Sample 2/2',
			placeHolder: 'Select Client',
		});
	};

	/**
	 * Ask for where to clone the sample
	 */
	private promptPath = async (
		sample: SampleQuickPickItem,
	): Promise<string | undefined> => {
		const cloneDirectoryUri = await vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
			defaultUri: vscode.workspace.workspaceFolders
				? vscode.workspace.workspaceFolders[0].uri
				: undefined,
			openLabel: 'Clone sample',
		});

		if (!cloneDirectoryUri) {
			return;
		}

		const clonePath = path.resolve(
			cloneDirectoryUri[0].fsPath,
			sample.sampleData.name,
		);

		return clonePath;
	};

	/**
	 * Execute the sample creation with the given config at the given path
	 */
	// private createSample = (
	// 	sampleName: string,
	// 	integrationName: string,
	// 	client: string,
	// 	path: string,
	// ): Promise<SampleCreateResponse | null> => {
	// 	const sampleCreateRequest = new SampleCreateRequest();
	// 	sampleCreateRequest.setSampleName(sampleName);
	// 	sampleCreateRequest.setIntegrationName(integrationName);
	// 	sampleCreateRequest.setServer(server);
	// 	sampleCreateRequest.setClient(client);
	// 	sampleCreateRequest.setPath(path);

	// 	return new Promise<SampleCreateResponse | null>((resolve, reject) => {
	// 		this.daemonClient?.sampleCreate(
	// 			sampleCreateRequest,
	// 			(error, response) => {
	// 				if (error) {
	// 					// The error message that starts with 'we could not set...' is a special case that we want to
	// 					// handle differently. Unfortunately, the server does not distinguish this error from other
	// 					// ones, so we have to do our own handling.
	// 					if (error.details.startsWith('we could not set')) {
	// 						resolve(null);
	// 					} else {
	// 						reject(error);
	// 					}
	// 				} else if (response) {
	// 					resolve(response);
	// 				}
	// 			},
	// 		);
	// 	});
	// };

	/**
	 * Ask if the user wants to open the sample in the same or new window
	 */
	private promptOpenFolder = async (
		postInstallMessage: string,
		path: string,
	): Promise<void> => {
		const openFolderOptions = {
			sameWindow: 'Open in same window',
			newWindow: 'Open in new window',
		};

		const selectedOption = await vscode.window.showInformationMessage(
			postInstallMessage || 'Successfully created sample.',
			{ modal: true },
			...Object.values(openFolderOptions),
		);

		switch (selectedOption) {
			case openFolderOptions.sameWindow:
				await vscode.commands.executeCommand(
					'vscode.openFolder',
					vscode.Uri.file(path),
					{
						forceNewWindow: false,
					},
				);
				break;
			case openFolderOptions.newWindow:
				await vscode.commands.executeCommand(
					'vscode.openFolder',
					vscode.Uri.file(path),
					{
						forceNewWindow: true,
					},
				);
				break;
			default:
				break;
		}
	};
}
