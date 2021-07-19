import axios from 'axios';
import { authorizationHeaders } from '.';

export default async (sampleName: string) => {
	const result = await axios.get(
		// `https://api.github.com/repos/stfkolev/fs-ng-flask/languages`,
		`https://api.github.com/repos/${sampleName}/languages`,
		{
			headers: authorizationHeaders,
		},
	);

	const integrationLanguage = Object.keys(result.data).reduce((left, right) =>
		result.data[left] > result.data[right] ? left : right,
	);

	return integrationLanguage;
};
