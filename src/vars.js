const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const port = process.env.PORT || 5000;
const hostname = process.env.HOST || "localhost";
const baseUrl = process.env.NODE_ENV == "production" ? "https://forumula-one.herokuapp.com/api/f1/" :  "http://ergast.com/api/f1/";
const baseUrlWeather = "https://weatherapi-com.p.rapidapi.com";
const host = "weatherapi-com.p.rapidapi.com";
const apiKey = "876d91601bmsh299991229f50559p1bfe00jsn9cfb26a0fe9a";

export { baseUrl, baseUrlWeather, host, apiKey };
