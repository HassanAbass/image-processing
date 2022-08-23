import fs from "fs";
import path from "path";
import resize from "./../libs/resize";
import { IMAGE_DIR, THUMB_DIR } from "./constants";

export const imagePath = (name: string): string => {
    return path.resolve(`${__dirname}/../${IMAGE_DIR}/${name}`);
};

export const thumbPath = (name: string): string => {
    return path.resolve(`${__dirname}/../${THUMB_DIR}/${name}`);
};

export const resizedName = (
    name: string,
    width: number,
    height: number
): string => {
    return `${name.split(".").shift()}-${width}x${height}.${name
        .split(".")
        .pop()}`;
};

export const fileExists = (path: string): boolean => {
    return fs.existsSync(path);
};

export const writeThumbFile = async (
    name: string,
    width: number,
    height: number
): Promise<void> => {
    await resize(
        imagePath(name),
        width,
        height,
        thumbPath(resizedName(name, width, height))
    );
};
