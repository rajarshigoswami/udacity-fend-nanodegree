const API_KEY = "9d7ff752e42a341a4e5bba0009187756";
const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const ADD_JOURNAL_RECORD = "/addRecord";
const GET_JOURNAL_RECORDS = "/getRecords";

const ELEMENTS = {
    zipInput: document.querySelector("#zip"),
    feelingsInput: document.querySelector("#feelings"),
    generateBtn: document.querySelector("#generate"),
};

const generateURL = (zipcode) => {
    const url = new URL(OPENWEATHER_URL);
    url.searchParams.append("zip", zipcode);
    url.searchParams.append("appid", API_KEY);
    return url.href;
};
const formatDate = (date) => {
    const dateTimeFormat = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" });
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);
    return `${day}-${month}-${year}`;
};
//get weather data for a z
const getWeatherData = async (zipCode) => {
    let weatherData = await fetch(generateURL(zipCode));
    let response = weatherData.json();
    return response;
};

//get data from server
const getRecordsFromJournal = async () => {
    let journalRecords = await fetch(GET_JOURNAL_RECORDS);
    let response = journalRecords.json();
    return response;
};

//without headers data goes for a toss
const postRecordToJournal = async (data) => {
    const response = await fetch(ADD_JOURNAL_RECORD, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response;
};

//add data to server
const addRecordsToJournal = (evt) => {
    evt.preventDefault();
    const zipCode = ELEMENTS.zipInput.value;
    const feelings = ELEMENTS.feelingsInput.value;
    getWeatherData(zipCode)
        .then((data) => {
            if (data) {
                const newRecord = {};
                newRecord.date = formatDate(new Date());
                newRecord.temp = data.main.temp;
                newRecord.feelings = feelings;
                postRecordToJournal(newRecord);
            }
        })
        .then(updateUI)
        .catch((error) => console.log(error));
};

const updateUI = () => {
    getRecordsFromJournal().then((records) => {
        paintUI(records);
        ELEMENTS.zipInput.value = "";
        ELEMENTS.feelingsInput.value = "";
    });
};

const generateDiv = ({ date, temp, feelings }) => {
    return `<div class="record">
                <div class="date">
                    <div>
                        Date :
                    </div>
                    <div>${date}</div>
                </div>
                <div class="temp">
                    <div>
                        Temperature :
                    </div>
                    <div>${temp} &deg;C</div>
                </div>
                <div class="emotion">
                    <div>
                        Feeling :
                    </div>
                    <div>${feelings}</div>
                </div>
            </div>`;
};

const paintUI = (records) => {
    const htmlData = records.map(generateDiv).join("");
    document.querySelector(".scrollable").innerHTML = htmlData;
};
const checkInput = () => {
    const zipCode = ELEMENTS.zipInput.value;
    const feelings = ELEMENTS.feelingsInput.value;
    if (zipCode !== "" && feelings !== "") {
        ELEMENTS.generateBtn.disabled = false;
    } else {
        ELEMENTS.generateBtn.disabled = true;
    }
};

const checkZipInput = (evt) => {
    const zipCode = ELEMENTS.zipInput.value;
    if (zipCode === "" || parseInt(zipCode).toString() !== zipCode || zipCode.length > 5) {
        ELEMENTS.zipInput.classList.add("fail");
        alert("Zipcode can only be a number and only 5 digits are allowed");
    } else {
        ELEMENTS.zipInput.classList.remove("fail");
    }
    checkInput();
};
const checkFeelingsInput = (evt) => {
    const zipCode = ELEMENTS.feelingsInput.value;
    if (zipCode === "") {
        ELEMENTS.feelingsInput.classList.add("fail");
        alert("Please enter your feelings");
    } else {
        ELEMENTS.feelingsInput.classList.remove("fail");
    }
    checkInput();
};

ELEMENTS.zipInput.addEventListener("change blur", checkZipInput);
ELEMENTS.zipInput.addEventListener("blur", checkZipInput);
ELEMENTS.feelingsInput.addEventListener("change", checkFeelingsInput);
ELEMENTS.feelingsInput.addEventListener("blur", checkFeelingsInput);
ELEMENTS.generateBtn.addEventListener("click", addRecordsToJournal);
