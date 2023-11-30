import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "71c685c239c04b4fb1491e345408e5ad";
const redirectUrl = "http://localhost:3000/library";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiGetCall = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiGetCall.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiGetCall;
