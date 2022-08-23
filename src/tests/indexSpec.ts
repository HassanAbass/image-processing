import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Test App functionality", () => {
    it("gets the api endpoint with existing image", async () => {
        const response = await request.get(
            "/api/images?fileName=fjord.jpg&width=300&height=300"
        );
        expect(response.status).toBe(200);
    });

    it("fail on image, width, height not provided", async () => {
        const response = await request.get(
            "/api/images?fileName=noImage.jpg&width=300&height=300"
        );
        expect(response.status).toBe(422);
    });
});
