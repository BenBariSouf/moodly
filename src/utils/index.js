// Api utils
export const getRedirectUri = () => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
		return "http://localhost:3000/app";
	} else {
		return "https://moodly-one.vercel.app/";
	}
};

export const login = () => {
	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
	const scope = "user-read-recently-played,user-top-read,playlist-modify-public";
	const authUri = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${getRedirectUri()}&scope=${scope}`;
	window.location.replace(authUri);
};

//Others
export function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
