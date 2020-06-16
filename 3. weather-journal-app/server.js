const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ADD_JOURNAL_RECORD = "/addRecord";
const GET_JOURNAL_RECORDS = "/getRecords";

const PORT = process.env.PORT || 8080;

let counter = 1;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));
const projectData = [];

//start the server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

app.get(GET_JOURNAL_RECORDS, (req, res) => {
    res.send(projectData);
});

/* POST Request => Add/Register a Record to the Journal(projectData) */
app.post(ADD_JOURNAL_RECORD, (req, res) => {
    let data = {};
    data.date = req.body.date;
    data.temp = req.body.temp;
    data.feelings = req.body.feelings;
    data.count = counter++;
    projectData.push(data);
    res.send(true);
});
