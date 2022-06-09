import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ResultsView from "../components/ResultsView";
import SelectorView from "../components/SelectorView";
import { setAccessToken, setTracks } from "../reducers/spotifyReducer";
import queryString from "query-string";

const MainScreen = ({ location }) => {
	const dispatch = useDispatch();
	const tracks = useSelector((state) => state.tracks);

	useEffect(() => {
		const accessToken = queryString.parse(window.location.hash, { ignoreQueryPrefix: true }).access_token;
		dispatch(setAccessToken(accessToken));
		const tracks = JSON.parse(window.localStorage.getItem("tracks"));
		if (tracks) {
			dispatch(setTracks(tracks));
		}
	}, [dispatch, location]);

	return tracks && tracks.length > 0 ? <ResultsView /> : <SelectorView />;
};

export default MainScreen;
