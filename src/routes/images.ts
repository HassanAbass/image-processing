import express from "express";
import { SUCCESS_CODE, VALIDATION_CODE } from "../libs/constants";
import {
    fileExists,
    resizedName,
    thumbPath,
    writeThumbFile,
} from "../libs/file";
import notFound from "./validation";
const router = express.Router();

router.get(
    "/images",
    notFound,
    async (req: express.Request, res: express.Response): Promise<void> => {
        const width: number = parseInt(req.query.width as string);
        const height: number = parseInt(req.query.height as string);
        const fileName: string = req.query.fileName as string;
        try {
            if (fileExists(thumbPath(resizedName(fileName, width, height))))
                return res
                    .status(SUCCESS_CODE)
                    .sendFile(thumbPath(resizedName(fileName, width, height)));
            await writeThumbFile(fileName, width, height);
            return res
                .status(SUCCESS_CODE)
                .sendFile(thumbPath(resizedName(fileName, width, height)));
        } catch (e) {
            res.status(VALIDATION_CODE).send(e);
        }
    }
);

export default router;
