require('dotenv').config()
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
const baseUrl = process.env.NODE_ENV == "production" ? `${host}:${port}` :  "http://ergast.com/api/f1/";
console.log(process.env.NODE_ENV)
const baseUrlWeather = "https://weatherapi-com.p.rapidapi.com";
const host = "weatherapi-com.p.rapidapi.com";
const apiKey = "876d91601bmsh299991229f50559p1bfe00jsn9cfb26a0fe9a";

export { baseUrl, baseUrlWeather, host, apiKey };
