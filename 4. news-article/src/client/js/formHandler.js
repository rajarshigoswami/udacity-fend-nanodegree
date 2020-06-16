import { checkForURL } from "./urlChecker";

async function handleSubmit(event) {
    event.preventDefault();
    // check what text was put into the form field
    const formText = document.getElementById("name").value;
    if (!checkForURL(formText)) {
        updateInvalidURL();
        return false;
    }
    try {
        const response = await fetch("http://localhost:8081/test", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ UserText: formText }),
        });
        const newData = await response;
        newData.json().then((res) => {
            updateData(res);
            return true;
        });
    } catch (error) {
        console.log("i am error", error);
        // appropriately handle the error
        updateError(error);
        return false;
    }
}

function updateData({
    polarityConfidence = "",
    subjectivity = "",
    subjectivityConfidence = "",
    text = "",
    textPolarity = "",
}) {
    const resultsDiv = `<div class="success-response">
        <h3>Text Polarity : ${textPolarity}</h3>
        <h4>Polarity Confidence : ${polarityConfidence}</h4>
        <h3>Subjectivity : ${subjectivity}</h4>
        <h4>Subjectivity Confidence : ${subjectivityConfidence}</div>
        <h3>Text : ${text}</h3>
    </div>`;
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#results").insertAdjacentHTML("beforeend", resultsDiv);
}
function updateError() {
    const resultsDiv = `<div class="failure-response">
    Error in getting response. Please try Again.
    </div>
    `;
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#results").insertAdjacentHTML("beforeend", resultsDiv);
}

function updateInvalidURL() {
    const resultsDiv = `<div class="invalid-url">
    Invalid Url, Please enter a valid url and retry
    </div>
    `;
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#results").insertAdjacentHTML("beforeend", resultsDiv);
}

export { handleSubmit, updateData, updateInvalidURL };
