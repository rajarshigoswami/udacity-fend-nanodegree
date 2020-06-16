import { checkForURL } from "../client/js/urlChecker";

describe('Test, the function "checkForURL()" for valid url', () => {
    var url =
        "https://timesofindia.indiatimes.com/india/indias-covid-19-recovery-rate-improving-fatality-rate-declining-health-ministry/articleshow/76136280.cms";
    test("It should return true", async () => {
        const response = checkForURL(url);
        expect(response).toBeDefined();
        expect(response).toBe(true);
    });
});
