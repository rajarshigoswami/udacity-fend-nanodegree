const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const aylien = require("aylien_textapi");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const textApi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
});

const testRequest = (req, res) => {
    textApi.sentiment(
        {
            text: req.body.UserText,
        },
        function (error, response) {
            if (error === null) {
                details = {
                    textPolarity: response.polarity,
                    subjectivity: response.subjectivity,
                    text: response.text,
                    polarityConfidence: response.polarity_confidence,
                    subjectivityConfidence: response.subjectivity_confidence,
                };
                res.json(details);
            }
        }
    );
};

const PORT = process.env.PORT || 8081;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

//start the server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

app.get("/", function (req, res) {
    res.sendFile(path.resolve("dist/index.html"));
});

app.post("/test", testRequest);
