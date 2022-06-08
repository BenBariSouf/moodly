import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setSelectedGenres } from "../reducers/spotifyReducer";
import { getRecommendations } from "../actions";
import Button from "./Button";

const genres = ["Pop", "Rock", "Hip-Hop", "Electronic", "Indie", "Metal", "Punk", "Classical", "Alternative", "Chill", "Country", "Techno"];

const Wrapper = styled.div`
	display: flex;
	max-width: 700px;
	flex-wrap: wrap;
	justify-content: center;
`;

const GenreButton = styled(Button)`
	color: ${({ selected }) => (selected ? "#203e3f" : "white")};
	font-weight: ${({ selected }) => selected && "bold"};
	background-color: ${({ selected }) => selected && "#a7f3d0"};
	border: ${({ selected }) => selected && "1px solid #203e3f"};
	border-radius: 50px;
	min-width: 150px;
	font-family: "arial";
	font-weight: 600;
	letter-spacing: 0.9px;
	font-size: 17px;
	height: 45px;
	margin-top: 15px;
`;

const GenreSelector = () => {
	const dispatch = useDispatch();
	const selectedGenres = useSelector((state) => state.selectedGenres);

	const buttonClickHandler = (genre) => () => {
		const newSelectedGenres = [...selectedGenres];
		if (selectedGenres.includes(genre)) {
			newSelectedGenres.splice(selectedGenres.indexOf(genre), 1);
		} else if (selectedGenres.length < 5) {
			newSelectedGenres.push(genre);
		} else {
			return;
		}
		dispatch(setSelectedGenres(newSelectedGenres));
		//dispatch(getRecommendations());
	};

	return (
		<Wrapper>
			{genres.map((genre) => (
				<GenreButton key={genre} selected={selectedGenres.includes(genre)} onClick={buttonClickHandler(genre)}>
					{genre}
				</GenreButton>
			))}
		</Wrapper>
	);
};

export default GenreSelector;
