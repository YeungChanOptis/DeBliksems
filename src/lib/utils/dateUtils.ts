const ONE_DAY = 1000 * 3600 * 24;

export function daysBetween(start: string | Date, end: string | Date) {
	const timeDiff = new Date(end).getTime() - new Date(start).getTime();
	const dayDiff = Math.round(timeDiff / ONE_DAY);
	return dayDiff;
}
