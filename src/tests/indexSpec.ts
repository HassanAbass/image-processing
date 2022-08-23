import supertest from "supertest";
import app from "../index";
import { VALIDATION_CODE } from "../libs/constants";
import {
    fileExists,
    resizedName,
    thumbPath,
    writeThumbFile,
} from "../libs/file";

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
        expect(response.status).toBe(VALIDATION_CODE);
    });

    it("test image processing function", async () => {
        await writeThumbFile("santamonica.jpg", 500, 400);
        expect(
            fileExists(thumbPath(resizedName("santamonica.jpg", 500, 400)))
        ).toEqual(true);
    });
});
