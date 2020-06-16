const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../../webpack.dev");
const compiler = webpack(config);
dotenv.config();
//API Keys
const GEO_API_KEY = process.env.GEO_API_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API = process.env.PIXABAY_API;

const PORT = process.env.PORT || 8081;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

//start the server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

//URL Methods
const getGeoURL = (location) => {
    return `http://api.geonames.org/searchJSON?formatted=true&q=${location}&username=${GEO_API_KEY}`;
};
const getWeatherbitURL = (lat, long) => {
    return `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${long}&key=${WEATHERBIT_API_KEY}`;
};
const getWeatherbitForecastURL = (lat, long) => {
    return `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&key=${WEATHERBIT_API_KEY}`;
};
const getPixabayURL = (location) => {
    return `https://pixabay.com/api/?key=${PIXABAY_API}&q=${location}&image_type=photo`;
};
//URL Methods End

//API Calls
const getGeoInfo = async (location) => {
    const geoData = await fetch(getGeoURL(location));
    try {
        const data = await geoData.json();
        if (data.totalResultsCount > 0) {
            const filteredData = data.geonames[0];
            return {
                data: {
                    name: filteredData.name,
                    lat: filteredData.lat,
                    lng: filteredData.lng,
                    country: filteredData.countryName,
                },
                success: true,
            };
        } else {
            return {
                data: [],
                success: false,
            };
        }
    } catch (error) {
        return {
            data: [],
            success: false,
        };
    }
};
const getCurrentWeatherInfo = async (lat, long) => {
    const weatherData = await fetch(getWeatherbitURL(lat, long));
    try {
        const data = await weatherData.json();
        if (data.count >= 1) {
            const filteredData = data.data[0];
            return {
                data: {
                    app_temp: filteredData.app_temp,
                    clouds: filteredData.clouds,
                    sunrise: filteredData.sunrise,
                    sunset: filteredData.sunset,
                    temp: filteredData.temp,
                    weather: filteredData.weather.description,
                    weatherInfo: true,
                    weatherForecast: false,
                },
                success: true,
            };
        } else {
            return {
                data: [],
                success: false,
            };
        }
    } catch (error) {
        return {
            data: [],
            success: false,
        };
    }
};

const getForecastWeatherInfo = async (lat, long) => {
    const weatherData = await fetch(getWeatherbitForecastURL(lat, long));
    try {
        const data = await weatherData.json();
        if (data.count >= 1) {
            const filteredData = data.data[0];
            return {
                data: {
                    app_temp: filteredData.app_temp,
                    clouds: filteredData.clouds,
                    sunrise: filteredData.sunrise,
                    sunset: filteredData.sunset,
                    temp: filteredData.temp,
                    weather: filteredData.weather.description,
                    weatherInfo: true,
                    weatherForecast: false,
                },
                success: true,
            };
        } else {
            return {
                data: [],
                success: false,
            };
        }
    } catch (error) {
        return {
            data: [],
            success: false,
        };
    }
};

const getPixabayInfo = async (location) => {
    const pixabayData = await fetch(getPixabayURL(location));
    try {
        const data = await pixabayData.json();
        if (data.totalHits > 1) {
            const filteredData = data.hits.slice(0, 6).reduce((a, c) => {
                a.push(c.webformatURL);
                return a;
            }, []);
            return {
                data: filteredData,
                success: true,
            };
        } else {
            return {
                data: [],
                success: false,
            };
        }
    } catch (error) {
        return {
            data: [],
            success: false,
        };
    }
};
//API Calls End

//Facade Call

const getDaysDiff = (day1, day2) => {};

const getInfo = async (location, start_date, end_date) => {
    //get the lat-long
    let geoDetails, weatherDetails, pixabayDetails;
    const currentDate = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const daysDiff = (currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    geoDetails = await getGeoInfo(location);
    const lat = geoDetails.data.lat,
        long = geoDetails.data.lng;
    if (geoDetails.success) {
        if (daysDiff < 7) {
            weatherDetails = await getCurrentWeatherInfo(lat, long);
        } else {
            weatherDetails = await getForecastWeatherInfo(lat, long);
        }
        pixabayDetails = await getPixabayInfo(location);
    }
    return {
        geoDetails,
        weatherDetails,
        pixabayDetails,
        query: {
            location,
            start_date,
            end_date,
        },
    };
};

const root = (req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
};
//Entry point for the application. Will be a facade for all the other api calls;
app.get("/info", async (req, res) => {
    const location = req.query.city;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const info = await getInfo(location, start_date, end_date);
    return res.json(info);
});
app.get("/getGeoInfo", async (req, res) => {
    const location = req.query.city;
    const locationInfo = await getGeoInfo(location);
    return res.json(locationInfo);
});
app.get("/getCurrentWeatherInfo", async (req, res) => {
    const lat = req.query.lat;
    const long = req.query.long;
    const weatherData = await getCurrentWeatherInfo(lat, long);
    return res.json(weatherData);
});
app.get("/getWeatherForcast", async (req, res) => {
    const lat = req.query.lat;
    const long = req.query.long;
    const weatherData = await getForecastWeatherInfo(lat, long);
    return res.json(weatherData);
});
app.get("/getPixabayInfo", async (req, res) => {
    const location = req.query.city;
    const pixabayData = await getPixabayInfo(location);

    return res.json(pixabayData);
});
app.get("/", root);

exports.getGeoURL = getGeoURL;
