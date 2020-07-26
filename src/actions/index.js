export const changeDate = (date) => {
	return {
		type: "CHANGE_DATE",
		payload: date,
	};
};

export const fetchMeetings = (date) => {
	return {
		type: "FETCH_MEET",
		payload: date,
	};
};

export const changeStartTime = (startTime) => {
	return {
		type: "START_TIME",
		payload: startTime,
	};
};

export const changeEndTime = (endTime) => {
	return {
		type: "END_TIME",
		payload: endTime,
	};
};
