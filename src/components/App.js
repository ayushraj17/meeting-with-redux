import React from "react";
import ShowMeeting from "./ShowMeeting";
import AddMeeting from "./AddMeeting";
import { Route, Switch, Router } from "react-router-dom";
import History from "../History";
// eslint-disable-next-line no-restricted-globals
// import History from "../History";

function App() {
	return (
		<Router history={History}>
			<div className=" flex  justify-center mt-20 ">
				<Switch>
					<Route path="/" exact component={ShowMeeting} />
					<Route path="/add" exact component={AddMeeting} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
