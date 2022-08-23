import express from "express";
import {
    fileExists,
    imagePath,
    resizedName,
    thumbPath,
    writeThumbFile,
} from "../libs/file";
const router = express.Router();

router.get("/images", async (req, res): Promise<void> => {
    let width: number = parseInt(req.query.width as string);
    let height: number = parseInt(req.query.height as string);
    let fileName: string = req.query.fileName as string;
    try {
        if (!fileName) throw "Provide image name, 'fileName' key is requried.";
        if (!width || !height) throw "Provide image width and height.";
        if (!fileExists(imagePath(fileName))) throw "File not found.";
        if (fileExists(thumbPath(resizedName(fileName, width, height))))
            return res.sendFile(
                thumbPath(resizedName(fileName, width, height))
            );

        await writeThumbFile(fileName, width, height);
        res.sendFile(thumbPath(resizedName(fileName, width, height)));
    } catch (e) {
        res.status(422).send(e);
    }
});

export default router;
