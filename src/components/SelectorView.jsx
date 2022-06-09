import styled from "styled-components";
import MoodSelector from "./MoodSelector";
import GenreSelector from "./GenreSelector";
import DiscoverButton from "./DiscoverButton";
import { BigTitle, SmallTitle } from "./Typography";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.div`
	margin-top: 25px;
`;

const SelectorView = () => (
	<Wrapper>
		<Header>
			<BigTitle>What's your mood?</BigTitle>
		</Header>
		<MoodSelector />
		<SmallTitle>Choose up to 5 genres:</SmallTitle>
		<GenreSelector />
		<DiscoverButton />
	</Wrapper>
);

export default SelectorView;
