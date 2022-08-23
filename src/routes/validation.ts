import express, { NextFunction } from "express";
import { VALIDATION_CODE } from "../libs/constants";
import { fileExists, imagePath } from "../libs/file";

export default (
    req: express.Request,
    res: express.Response,
    next: NextFunction
) => {
    try {
        const width: number = parseInt(req.query.width as string);
        const height: number = parseInt(req.query.height as string);
        const fileName: string = req.query.fileName as string;

        if (!fileName) throw "Provide image name, 'fileName' key is requried.";
        if (!width || !height) throw "Provide image width and height.";
        if (!fileExists(imagePath(fileName))) throw "File not found.";
        next();
    } catch (e) {
        return res.status(VALIDATION_CODE).send(e);
    }
};
