import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDate } from "../actions";
import { Link } from "react-router-dom";
import axios from "axios";
function AddMeeting() {
	const date = useSelector((state) => state.date);
	const [startTime, setStartTime] = useState("13:00");
	const [endTime, setEndTime] = useState("14:00");
	const [data, setData] = useState([]);
	const [alertShow, setAlertShow] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [des, setDes] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			let apiDate =
				date.slice(-2) + "/" + date.slice(6, 7) + "/" + date.slice(0, 4);

			const result = await axios(
				`http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${apiDate}`
			);
			setData(result.data);
		};

		fetchData();
	}, [date]);

	useEffect(() => {
		setAlertShow(false);
	}, [startTime, endTime]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	const slotChecker = () => {
		data.map(({ start_time, end_time }) => {
			if (end_time === endTime || start_time === startTime) {
				console.log("run");
				setAlertShow(false);
			}
			if (endTime === "00:00" || startTime === "00:00") {
				setAlertMsg(" Slot unavailable");
				setAlertShow(false);
			} else {
				setAlertMsg(" Slot available");
				setAlertShow(true);
			}
		});

		// data
		// 	.filter(
		// 		({ start_time, end_time }) => end_time === endTime
		// 		// if (String(end_time) === endTime) {
		// 		// 	setAlertMsg(" Slot unavailable");
		// 		// 	return setAlertShow(false);
		// 		// }
		// 	)
		// 	.setAlertShow(false);
	};

	const renderButton = () => {
		// if (date.slice(-2) < d.slice(-2) || alert === "Slot unavailable") {
		// 	return (
		// 		<button
		// 			type="submit"
		// 			className=" px-6 py-3 rounded-lg cursor-not-allowed bg-blue-500 opacity-50 "
		// 			disabled
		// 			onClick={() => console.log("click")}
		// 		>
		// 			Save
		// 		</button>
		// 	);
		// }
		return (
			<button
				onClick={slotChecker}
				type="submit"
				className="  px-6 py-3 rounded-lg transition mb-2 duration-500 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 ..."
			>
				{!alertShow ? <Link to="/add">Continue</Link> : "Save"}
			</button>
		);
	};
	return (
		<div>
			<div className="text-center text-extra-bold text-blue-600 text-3xl"></div>
			<form onSubmit={handleSubmit}>
				<div className="shadow-lg container h-vw bg-white p-4  ">
					<input
						className="flex  bg-gray-200  mt-8 lg:m-8 lg:p-2 lg:px-4 "
						type="date"
						value={date}
						onChange={(e) => dispatch(changeDate(e.target.value))}
					/>
					<div className="flex row justify-between mt-8">
						<input
							className="bg-gray-200 lg:m-8 lg:p-2 lg:px-16 "
							type="time"
							// label="start-time"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
						<input
							className="bg-gray-200 lg:m-8 lg:p-2  lg:px-16"
							type="time"
							value={endTime}
							onChange={(e) => setEndTime(e.target.value)}
						/>
					</div>
					<textarea
						className="bg-gray-200  lg:m-8 m-auto h-56  w-11/12 "
						placeholder="Description"
						value={des}
						onChange={(e) => setDes(e.target.value)}
					/>
				</div>
				<div className=" flex justify-center mt-12 ">{renderButton()}</div>
			</form>
		</div>
	);
}

export default AddMeeting;
