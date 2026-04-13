const supertest = require("supertest");
const app = require("../server");
const { expect } = require("@jest/globals");
const request = supertest(app);
const mongodb = require("../data/database");

beforeAll(() => {
    return new Promise((resolve, reject) => {
        mongodb.initDb((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
});

describe("GET PRODUCTS", () => {
    test("/products should return all the products", async () => {
        const res = await request.get("/products");
        expect(res.statusCode).toBe(200);
        expect(res.header["content-type"]).toMatch(/json/);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("/products/:id should return the product related to the id provided", async () => {
        const res = await request.get("/products/6621a1f29f1b8c0012345671");
        expect(res.statusCode).toBe(200);
        expect(res.header["content-type"]).toMatch(/json/);
    });

    // test("/products/:id should return a 404 status code when the id is not found", async () => {
    //     const res = await request.get("/products/123456789012345678901234");
    //     expect(res.statusCode).toBe(404);
    //     expect(res.header["content-type"]).toMatch(/json/);
    // });
});

describe("GET REVIEWS", () => {
    test("/reviews should return all the reviews", async () => {
        const res = await request.get("/reviews");
        expect(res.statusCode).toBe(200);
        expect(res.header["content-type"]).toMatch(/json/);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("/reviews/:id should return the review related to the id provided", async () => {
        const res = await request.get("/reviews/6621a1f29f1b8c0012345681");
        expect(res.statusCode).toBe(200);
        expect(res.header["content-type"]).toMatch(/json/);
    });
});

describe("GET USERS", () => {
    test("/users should return all the users", async () => {
        const res = await request.get("/users");
        expect(res.statusCode).toBe(200);
        expect(res.header["content-type"]).toMatch(/json/);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("/users/:id should return the user related to the id provided", async () => {
        const res = await request.get("/users/6621a1f29f1b8c0012345691");
        expect(res.statusCode).toBe(200);
        expect(res.header["content-type"]).toMatch(/json/);
    });
});

describe("GET ROLES", () => {
    test("/roles should return all the roles", async () => {
        const res = await request.get("/roles");
        expect(res.statusCode).toBe(200);
        expect(res.header["content-type"]).toMatch(/json/);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("/roles/:id should return the role related to the id provided", async () => {
        const res = await request.get("/roles/6621a1f29f1b8c0012345701");
        expect(res.statusCode).toBe(200);
        expect(res.header["content-type"]).toMatch(/json/);
    });
});

afterAll(async () => {
    await mongodb.closeDb();
});
