import assert from "node:assert/strict";
import { test } from "node:test";
import { matchesProperty } from "./propertyFilters.js";
const property = { type: "house", status: "sale", location: "Kubwa, Abuja", price: 20000000 };
test("combines location, type, status and budget", () => {
    assert.equal(matchesProperty(property, { type: "house", status: "sale", location: " ABUJA ", priceRange: "20000000-50000000" }), true);
    for (const filters of [{ type: "land" }, { status: "rent" }, { location: "Kano" }, { priceRange: "5000000-20000000" }]) {
        assert.equal(matchesProperty(property, filters), false);
    }
});
test("supports open budgets and excludes missing prices from budget results", () => {
    assert.equal(matchesProperty({ price: 100000000 }, { priceRange: "100000000+" }), true);
    assert.equal(matchesProperty({ price: 99999999 }, { priceRange: "100000000+" }), false);
    for (const price of [undefined, null, "", "unknown"]) {
        assert.equal(matchesProperty({ price }, { priceRange: "0-5000000" }), false);
    }
    assert.equal(matchesProperty({}, { priceRange: "all" }), true);
});
