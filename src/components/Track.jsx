import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "../styles/Track.scss";

const Card = styled.div`
	display: inline-block;
	position: relative;
	min-width: 360px;
	height: 160px;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);

	.hero-description-bk {
		background-image: linear-gradient(0deg, #1e293b, #134e4a);
		border-radius: 30px;
		position: absolute;
		top: 55%;
		left: -5px;
		height: 65%;
		width: 108%;
		transform: skew(19deg, -9deg);
	}

	.learn-more {
		position: absolute;
		color: #fff;
		right: 25px;
		bottom: 12%;
	}

	.learn-more a {
		color: #fff;
	}
`;

const HeroLogo = styled.div`
	height: 95px;
	width: 95px;
	border-radius: 18px;
	background-color: #fff;
	position: absolute;
	bottom: 22%;
	left: 22px;
	overflow: hidden;
	box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.7);

	img {
		height: 100%;
	}
`;

const HeroDescription = styled.div`
	position: absolute;
	color: #fff;
	font-weight: 600;
	left: 130px;
	bottom: 45%;
`;

const Thumbnail = styled.img`
	border-radius: 5px;
`;

const ArtistLabel = styled.div`
	font-size: 14px;
	@media only screen and (max-width: 600px) {
		font-size: 10px;
	}
`;

const TrackNameLabel = styled.div`
	font-size: 20px;
	@media only screen and (max-width: 600px) {
		font-size: 15px;
	}
`;

const formatTrackName = (trackName) => {
	const maxLength = 35;
	if (trackName.length > maxLength) {
		return trackName.substring(0, maxLength - 3) + "...";
	} else {
		return trackName;
	}
};

const Track = ({ trackData }) => {
	const loading = useSelector((state) => state.loading);
	const [imageLoaded, setImageLoaded] = useState(false);

	const { id, artist, imageUrl, name } = trackData;

	useEffect(() => {
		setImageLoaded(false);

		//In case image onload is not triggered for whatever reason.
		const timer = setTimeout(() => setImageLoaded(true), 700);
		return () => clearTimeout(timer);
	}, [trackData]);

	return (
		<Card>
			<div className="hero-description-bk"></div>
			<HeroLogo>
				<Thumbnail src={imageUrl} onLoad={() => setImageLoaded(true)} />
			</HeroLogo>
			<HeroDescription>
				<ArtistLabel>{artist}</ArtistLabel>
				<TrackNameLabel>{formatTrackName(name)}</TrackNameLabel>
			</HeroDescription>
			<button className="learn-more">
				<span className="circle" aria-hidden="true">
					<span className="icon arrow"></span>
				</span>
				<a className="button-text" href={`https://open.spotify.com/track/${id}`} target="_blank">
					Listen On Spotify
				</a>
			</button>
		</Card>
	);
};

export default Track;
