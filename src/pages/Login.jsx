import { useState } from "react";
import styled from "styled-components";
import { login } from "../utils";
import { PlaylistData } from "../PlaylistData";
import _ from "lodash";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MainTitle = styled.div`
	font-family: "Damion", cursive;
	font-size: 100px;
	font-weight: bold;
	text-align: center;
`;

const BigButton = styled.button`
	font-size: 15px;
	border: none;
	border-radius: 50px;
	background-color: #1db954;
	color: white;
	height: 50px;
	width: 230px;
	cursor: pointer;
	outline: none;
	display: block;
	margin-top: 50px;
	margin-bottom: 1rem;
	font-family: "arial";
	font-size: 1.125rem;
	letter-spacing: 0.35px;
	font-weight: 800;
	&:hover {
		background-color: #2ad666;
		transition: background-color, 0.5s;
	}
`;

const Subtitle = styled.span`
	text-align: center;
	font-family: "arial";
	letter-spacing: 0.5px;
	font-size: 1.25rem;
	margin-top: 1.5rem;
`;

const Slider = styled.div`
	// Animation
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-250px * 7));
		}
	}

	height: auto;
	margin: auto;
	overflow: hidden;

	&::before,
	&::after {
		content: "";
		height: 100px;
		position: absolute;
		width: 200px;
		z-index: 2;
	}

	&::after {
		right: 0;
		top: 0;
		transform: rotateZ(180deg);
	}

	&::before {
		left: 0;
		top: 0;
	}

	.slide-track {
		animation: scroll 40s linear infinite;
		display: flex;
	}

	.playlist-cover {
		box-shadow: 7px 7px 5px #ccc;
		width: 170px;
	}
	.slide {
		height: 250px;
		width: 250px;
		margin-left: 150px;
	}
`;

const LoginScreen = () => {
	const [sliderImages, setSliderImages] = useState(PlaylistData);

	//shuffle sliding images
	const shuffle = (array) => {
		array.sort(() => Math.random() - 0.5);
	};
	const getSliderImages = (num) => {
		shuffle(sliderImages);
		let images = [];

		_.times(Math.min(num, sliderImages.length), (i) => {
			images.push(
				<div className="slide" key={`${i}-image`}>
					<img className="playlist-cover" src={sliderImages[i]} alt="Playlist Cover" />
				</div>
			);
		});
		return images;
	};

	return (
		<>
			<Slider>
				<div className="slide-track">{getSliderImages(sliderImages.length)}</div>
			</Slider>
			<Wrapper>
				<MainTitle>Moodify</MainTitle>
				<Subtitle>Discover music that fits your mood</Subtitle>
				<BigButton onClick={login}>Log In With Spotify</BigButton>
			</Wrapper>
		</>
	);
};

export default LoginScreen;
