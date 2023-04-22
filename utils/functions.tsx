export const strToBool = (value: string) => {
	if (value && typeof value === 'string') {
		if (value.toLowerCase() === 'true' || 'yes') return true;
		if (value.toLowerCase() === 'false' || 'no') return false;
	}
	return value;
};
