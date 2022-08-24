import express, { NextFunction } from "express";
import { VALIDATION_CODE } from "../libs/constants";
import { fileExists, imagePath } from "../libs/file";

export const isPosNumber = (str: string): boolean => {
    const reg = new RegExp("^[1-9]\\d*$");
    return reg.test(str);
};

export default (
    req: express.Request,
    res: express.Response,
    next: NextFunction
): void => {
    try {
        const width: string = req.query.width as string;
        const height: string = req.query.height as string;
        const fileName: string = req.query.fileName as string;

        if (!fileName) throw "Provide image name, 'fileName' key is requried.";
        if (!width || !height) throw "Provide image width and height.";
        if (!isPosNumber(width) || !isPosNumber(height))
            throw "width, height must be positive integers, greater than zero.";
        if (!fileExists(imagePath(fileName))) throw "File not found.";
        next();
    } catch (e) {
        res.status(VALIDATION_CODE).send(e);
    }
};
