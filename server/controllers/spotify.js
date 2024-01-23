const axios = require("axios");
const qs = require("qs");

// IMPORT FROM ENV
require("dotenv").config();

const SPOTIFY_URL = "https://api.spotify.com/v1/search?";
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET_KEY;

const authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
        Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
        grant_type: "client_credentials",
    }),
};

exports.getToken = async () => {
    const response = await axios(authOptions);
    return response.data.access_token;
};

exports.getArtistData = async (artistName) => {
    const token = await exports.getToken();

    let header = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    };

    const artistResponse = await axios.get(
        SPOTIFY_URL + `q=artist:${artistName}` + `&type=artist`,
        {
            headers: header,
        }
    );

    return artistResponse.data.artists.items[0];
};
