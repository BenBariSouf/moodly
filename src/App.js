import LoginScreen from "./pages/Login";
import { Routes, Route, useLocation } from "react-router-dom";

import MainScreen from "./pages/Main";

export default () => {
	const { pathname, search } = useLocation();
	return (
		<div style={{ height: "100%" }}>
			<div id="bg"></div>
			<Routes>
				<Route path="/" exact element={<LoginScreen />} />

				<Route path="/app/" element={<MainScreen />} />
			</Routes>
		</div>
	);
};
