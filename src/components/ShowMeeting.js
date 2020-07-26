import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { changeDate } from "../actions";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function ShowMeeting() {
	const [data, setData] = useState([]);
	const date = useSelector((state) => state.date);
	const [counter, setCounter] = useState(0);

	const refer = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				`http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${date}`
			);

			setData(result.data);
		};

		fetchData();
	}, [date]);

	const handleDate = () => {
		dispatch(changeDate(refer.current.state.content));
		setCounter(0);
	};

	useEffect(() => handleDate());

	const renderList = () => {
		return data.map((meet, i) => {
			return (
				<div
					key={i}
					className=" flex p-4 mb-4 bg-gray-200  rounder-lg shadow-lg justify-between"
				>
					<div className="flex justify-around text-lg ">
						<div>{meet.start_time} </div>
						<div>{meet.end_time}</div>
					</div>
					<div className="text-sm">{meet.description}</div>
				</div>
			);
		});
	};

	const renderHeader = () => {
		return (
			<div className="mx-56 flex justify-center align-middle mb-12 text-3xl text-blue-600">
				<button
					className="hover:bg-gray-300 pointer-none  mx-4 flex -mt-3"
					onClick={() => setCounter(counter - 1)}
				>
					<i className="material-icons md-48">keyboard_arrow_left</i>
				</button>
				<Moment ref={refer} add={{ days: [counter] }} format="YYYY-MM-DD">
					{date}
				</Moment>
				<button
					className="hover:bg-gray-300 mx-4 flex -mt-3 "
					onClick={() => setCounter(counter + 1)}
				>
					<i className="material-icons md-48 ">keyboard_arrow_right</i>
				</button>
			</div>
		);
	};

	const renderButton = () => {
		// if (date.slice(0, 2) < tdate.slice(0, 2)) {
		// return (
		// 	<button
		// 		type="submit"
		// 		className=" px-6 py-1 rounded-lg cursor-not-allowed bg-blue-500 opacity-50 "
		// 		disabled
		// 		onClick={() => console.log("click")}
		// 	>
		// 		Add Meeting
		// 	</button>
		// );
		// }
		return (
			<button
				type="submit"
				className="  px-6 py-1 rounded-lg transition duration-500 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 ..."
			>
				<Link to="/add">Add Meeting</Link>
			</button>
		);
	};

	return (
		<div>
			<div className="w-full h-7/12 container  justify-center flex-row ">
				{renderHeader()}
				{renderList()}
			</div>
			<div className="self-end flex  justify-center align-bottom content-end">
				{renderButton()}
			</div>
		</div>
	);
}

export default ShowMeeting;
