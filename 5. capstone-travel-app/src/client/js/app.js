const ENTER_CITY_NAME_ERROR = "Please enter a city name";
const ENTER_START_DATE_ERROR = "Please enter a start date";
const ENTER_END_DATE_ERROR = "Please enter a end date";
const LOCAL_STORAGE_KEY = "weatherInfo";
const processForm = (e) => {
    if (e.preventDefault) e.preventDefault();
    const location = document.querySelector("#city-name").value;
    const startDate = document.querySelector("#start-date").value;
    const endDate = document.querySelector("#end-date").value;
    if (checkIfEmpty(location)) {
        displayAlert(true, ENTER_CITY_NAME_ERROR);
    } else if (checkIfEmpty(startDate)) {
        displayAlert(true, ENTER_START_DATE_ERROR);
    } else if (checkIfEmpty(endDate)) {
        displayAlert(true, ENTER_END_DATE_ERROR);
    } else {
        displayAlert(false, "");
        getWeatherStatus(location, startDate, endDate);
    }
};

const getWeatherStatus = async (location, startDate, endDate) => {
    try {
        const details = await fetch(getURL(location, startDate, endDate));
        const data = await details.json();
        if (data.geoDetails.success) {
            buildDom(data);
            updateLocalStorage(data);
        } else {
            displayAlert(
                true,
                `Unable to create trip for location ${data.query.location} . Please try with a different location`
            );
        }
    } catch (error) {
        displayAlert(true, `${error.message} . Please check if your server is up and running`);
    }
};

const displayAlert = (show, txt) => {
    const displayVal = show ? "block" : "none";
    document.querySelector(".alert.alert-danger").textContent = txt;
    document.querySelector(".alert-section").style.display = displayVal;
};

const getURL = (location, startDate, endDate) => {
    return `http://localhost:8081/info?city=${location}&start_date=${startDate}&end_date=${endDate}`;
};

const buildDom = (details) => {
    const { geoDetails, weatherDetails, pixabayDetails } = details;
    const { name, country, lat, lng } = geoDetails.data;
    const { app_temp, temp, weather, sunrise, sunset } = weatherDetails.data;
    const domMarkup = `<div class="jumbotron">
                            <div class="row">
                                <div class="col-md-6" style="max-width: 100%;">
                                    <img src="${details.pixabayDetails.data[0]}" class="d-block w-100" />
                                </div>
                                <div class="col-md-6 row">
                                    <div class="col-md-12">Location : ${name}</div>
                                    <div class="col-md-12">Country : ${country}</div>
                                    <div class="col-md-12">Latitude : ${lat}</div>
                                    <div class="col-md-12">Longitude: ${lng}</div>
                                    <div class="col-md-12">Temperature: ${temp}</div>
                                    <div class="col-md-12">Average Temparature: ${app_temp}</div>
                                    <div class="col-md-12">Weather: ${weather}</div>
                                    <div class="col-md-12">Surnise : ${sunrise}</div>
                                    <div class="col-md-12">Sunset: ${sunset}</div>
                                </div>
                            </div>
                        </div>`;
    document.querySelector(".details-section").insertAdjacentHTML("afterbegin", domMarkup);
};

const updateLocalStorage = (data) => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_KEY)) {
        const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        localData.unshift(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
    } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([data]));
    }
};
const init = () => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_KEY)) {
        const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        localData.forEach((item) => {
            buildDom(item);
        });
    }
};

const checkIfEmpty = (param) => {
    return param === "";
};

export { processForm, init, checkIfEmpty };
