import styled from "styled-components";
import Track from "./Track";

const Grid = styled.ul`
	list-style: none;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(1, minmax(10px, 1fr));
	grid-gap: 1.2rem;

	@media (min-width: 824px) {
		grid-template-columns: repeat(3, 1fr);
		margin: 2rem;
		gap: 2rem;
		grid-auto-rows: minmax(100px, auto);
	}
`;

const TracksGrid = ({ tracks }) => (
	<Grid>
		{tracks.map((trackData, i) => (
			<Track key={"track" + (i + 1)} trackData={trackData} />
		))}
	</Grid>
);

export default TracksGrid;
