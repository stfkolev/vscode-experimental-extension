import { Samples } from '../models/Samples';

export default async (samples: Samples) => {
	await samples.selectAndCloneSample();
};
