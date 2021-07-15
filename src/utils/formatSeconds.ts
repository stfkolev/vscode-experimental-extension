import * as moment from 'moment';

export default (seconds: number) => {
	const duration = moment.duration(seconds, 'seconds') as any;
	return duration.format('mm:ss');
};
