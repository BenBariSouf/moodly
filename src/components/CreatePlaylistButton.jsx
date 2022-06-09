import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylistId } from "../reducers/spotifyReducer";
import spotifyIcon from "../assets/spotify_icon.png";
import { login } from "../utils";

const PlaylistButton = styled.button`
	height: 2.8rem;
	padding: 0 2rem;
	border: none;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #1db954;
	margin: 0.5rem;
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
	cursor: pointer;
	color: white;
	letter-spacing: 1px;

	&:hover {
		background-color: #2ad666;
		transition: background-color, 0.5s;
	}
`;
const getHeaders = (accessToken) => ({
	Authorization: "Bearer " + accessToken,
	"Content-Type": "application/json",
});

const populatePlaylist = async (playlistId, tracks, accessToken) => {
	const populatePlaylistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
	await fetch(populatePlaylistUrl, {
		method: "PUT",
		headers: getHeaders(accessToken),
		body: JSON.stringify({
			uris: tracks.map((track) => track.uri),
		}),
	});
	//TODO handle error
};

const createPlaylist = async (accessToken, userId) => {
	const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
	const res = await fetch(url, {
		method: "POST",
		headers: getHeaders(accessToken),
		body: JSON.stringify({
			name: "My Moodly Playlist",
		}),
	}).then((res) => res.json());
	//TODO handle error
	return res.id;
};

const SpotifyIcon = styled.img`
	height: 1.2rem;
	width: 1.2rem;
	margin-left: 0.5rem;
`;

const CreatePlaylistButton = ({ tracks }) => {
	const dispatch = useDispatch();
	const accessToken = useSelector((state) => state.accessToken);
	let playlistId = useSelector((state) => state.playlistId);

	const openPlaylist = useCallback(async () => {
		if (!accessToken) {
			window.localStorage.setItem("tracks", JSON.stringify(tracks));
			login();
			return;
		}
		const getUserId = async () => {
			const res = await fetch("https://api.spotify.com/v1/me", {
				headers: getHeaders(accessToken),
			}).then((res) => res.json());
			//TODO: handle error
			return res.id;
		};
		const userId = await getUserId();
		if (!playlistId) {
			playlistId = await createPlaylist(accessToken, userId);
			dispatch(setPlaylistId(playlistId));
		}
		await populatePlaylist(playlistId, tracks, accessToken);
		const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
		window.open(playlistUrl);
	}, [tracks, accessToken, playlistId, dispatch]);

	useEffect(() => {
		if (window.localStorage.getItem("tracks")) {
			window.localStorage.removeItem("tracks");
			openPlaylist();
		}
	}, [openPlaylist]);

	return (
		<PlaylistButton onClick={openPlaylist}>
			Create Playlist
			<SpotifyIcon src={spotifyIcon} alt="Spotify Logo" />
		</PlaylistButton>
	);
};

export default CreatePlaylistButton;
