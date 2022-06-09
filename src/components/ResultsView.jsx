import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setTracks, setAudioProperties } from "../reducers/spotifyReducer";
import CreatePlaylistButton from "./CreatePlaylistButton";
import TracksGrid from "./TracksGrid";
import { BigTitle } from "./Typography";
import GithubIcon from "../assets/icons/github.svg";

const Wrapper = styled.div`
	width: 100%;
	padding-top: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const IconWrapper = styled.div`
	display: inline-flex;
	list-style: none;
	position: absolute;
	top: 35px;
	right: 80px;
	.icon {
		position: relative;
		background: #ffffff;
		border-radius: 50%;
		padding: 15px;
		margin: 10px;
		width: 40px;
		height: 40px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);

		@media (max-width: 768px) {
			visibility: hidden;
		}
	}

	.tooltip {
		position: absolute;
		top: 0;
		font-size: 14px;
		background: #ffffff;
		color: #ffffff;
		padding: 5px 8px;
		width: 140px;
		text-align: center;
		border-radius: 5px;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		opacity: 0;
		pointer-events: none;
		transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.tooltip::before {
		position: absolute;
		content: "";
		height: 8px;
		width: 8px;
		background: #ffffff;
		bottom: -4px;
		left: 50%;
		transform: translate(-50%) rotate(45deg);
		transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.icon:hover .tooltip {
		top: -35px;
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
	}

	.icon:hover span,
	.icon:hover .tooltip {
		text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
	}

	.github:hover,
	.github:hover .tooltip,
	.github:hover .tooltip::before {
		color: #333333;
	}
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
			<IconWrapper>
				<a className="icon github" href="https://github.com/BenBariSouf/moodly" aria-label="GitHub Link" target="_blank">
					<span className="tooltip">View On Github</span>
					<img src={GithubIcon} alt="Github Icon" />
				</a>
			</IconWrapper>
			<TracksWrapper>
				<TracksGrid tracks={tracks} />
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
