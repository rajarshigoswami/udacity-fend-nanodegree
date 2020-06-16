import { checkIfEmpty } from "./app";

test("Input for Empty City name ", () => {
    const result = checkIfEmpty("");
    expect(result).toBe(true);
});

test("Input for Valid City name ", () => {
    const result = checkIfEmpty("London");
    expect(result).toBe(false);
});
