import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setTracks, setAudioProperties } from "../reducers/spotifyReducer";
import CreatePlaylistButton from "./CreatePlaylistButton";
import TracksGrid from "./TracksGrid";
import { BigTitle } from "./Typography";

const Wrapper = styled.div`
	width: 100%;
	padding-top: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const TracksWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 90%;
	max-width: 900px;
	margin: 1rem;
`;

const ButtonsRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 40%;
	min-width: 350px;
	margin-bottom: 2rem;
`;

const GoAgainButton = styled.button`
	height: 2.8rem;
	padding: 0 1rem;
	border: 1px solid white;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.5rem;
	cursor: pointer;
	color: white;
	color: black;
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
	letter-spacing: 1px;
	background-color: white;
	text-align: center;
`;

const ResultsView = () => {
	const dispatch = useDispatch();
	const tracks = useSelector((state) => state.tracks);

	return (
		<Wrapper>
			<BigTitle>Here are some tracks you might enjoy:</BigTitle>
			<TracksWrapper>
				<TracksGrid tracks={tracks.slice(0, 18)} />
			</TracksWrapper>
			<ButtonsRow>
				<CreatePlaylistButton tracks={tracks} />
				<GoAgainButton
					onClick={() => {
						dispatch(setTracks(null));
						dispatch(setAudioProperties({ energy: 0.5, valence: 0.5 }));
					}}
				>
					Go Again
				</GoAgainButton>
			</ButtonsRow>
		</Wrapper>
	);
};

export default ResultsView;
