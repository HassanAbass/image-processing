import supertest from "supertest";
import app from "../index";
import { SUCCESS_CODE, VALIDATION_CODE } from "../libs/constants";
import {
    fileExists,
    resizedName,
    thumbPath,
    writeThumbFile,
} from "../libs/file";
import { isPosNumber } from "../routes/validation";

const request = supertest(app);

describe("Test App functionality", () => {
    it("gets the api endpoint with existing image", async () => {
        const response = await request.get(
            "/api/images?fileName=fjord.jpg&width=300&height=300"
        );
        expect(response.status).toBe(SUCCESS_CODE);
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

    it("validate number is positive, non zero", async () => {
        expect(isPosNumber("-1")).toEqual(false);
        expect(isPosNumber("0")).toEqual(false);
        expect(isPosNumber("100a")).toEqual(false);
        expect(isPosNumber("00")).toEqual(false);
        expect(isPosNumber("100")).toEqual(true);
    });
});
