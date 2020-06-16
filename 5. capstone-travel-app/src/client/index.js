import { processForm, init } from "./js/app";
import "bootstrap";

import "./styles/style.scss";

// export into the client library
export { processForm };

document.addEventListener("DOMContentLoaded", function (event) {
    const submitBtn = document.querySelector("#trip-info");
    submitBtn.addEventListener("click", processForm);
    init();
});
