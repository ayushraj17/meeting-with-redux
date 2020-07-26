import { combineReducers } from "redux";
let d = new Date();
d =
	d.getFullYear() +
	"-" +
	("0" + (parseInt(d.getMonth()) + 1)).slice(-2) +
	"-" +
	("0" + d.getDate()).slice(-2);

const DateReducer = (state = d, action) => {
	if (action.type === "CHANGE_DATE") return action.payload;
	else return state;
};

const MeetReducer = (state = [], action) => {
	if (action.type === "FETCH_DATA") return action.payload;
	else return state;
};

export default combineReducers({
	date: DateReducer,
	fetchMeetings: MeetReducer,
});
