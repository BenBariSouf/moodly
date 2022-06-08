import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getRecommendations } from "../actions";
import loaderIcon from "../assets/loader.svg";
import { setTracks } from "../reducers/spotifyReducer";
import { SmallTitle } from "./Typography";

const Discover = styled.span`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 180px;
	height: 55px;
	margin: 25px;
	perspective: 1000px;
`;

const DiscoveryButton = styled.a`
	font-family: "Montserrat", sans-serif;

	background: #0f172a;
	font-size: 19px;
	letter-spacing: 1px;
	color: #ffffff;
	cursor: pointer;
	padding: 1rem 2.5rem;
	transition: all 0.5s;
	border-radius: 10px;
	width: auto;
	position: relative;
	display: flex;
	align-items: center;

	&::after {
		content: "→";
		font-weight: bold;
		position: absolute;
		left: 75%;
		top: 33%;
		right: 5%;
		bottom: 0;
		opacity: 0;
	}

	&:hover {
		background: #166534;
		transition: all 0.5s;
		border-radius: 10px;
		box-shadow: 0px 6px 15px #14532d;
		padding: 1rem 4rem 1rem 1.5rem;

		&::after {
			opacity: 1;
			transition: all 0.5s;
		}
	}
`;

const DiscoverButton = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.loading);
	const genresSelected = useSelector((state) => state.selectedGenres.length > 0);
	const noTracksFound = useSelector((state) => state.tracks && state.tracks.length === 0);

	useEffect(() => {
		if (noTracksFound) {
			setTimeout(() => dispatch(setTracks(null)), 2000);
		}
	}, [noTracksFound, dispatch]);

	if (!genresSelected) {
		return null;
	} else if (noTracksFound) {
		return <SmallTitle>No matching tracks found</SmallTitle>;
	}
	return (
		<Discover>
			{isLoading ? <object data={loaderIcon} type="image/svg+xml"></object> : <DiscoveryButton onClick={() => dispatch(getRecommendations)}>Discover</DiscoveryButton>}
		</Discover>
	);
};

export default DiscoverButton;
