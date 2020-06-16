import { getGeoURL } from "./index";

test("Check for GEO URL ", () => {
    const result = getGeoURL("London");
    expect(result).toBe(`http://api.geonames.org/searchJSON?formatted=true&q=London&username=rajarshi.goswami`);
});
