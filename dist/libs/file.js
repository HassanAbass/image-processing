"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeThumbFile = exports.fileExists = exports.resizedName = exports.thumbPath = exports.imagePath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("./../libs/resize"));
const constants_1 = require("./constants");
const imagePath = (name) => {
    return path_1.default.resolve(`${__dirname}/../${constants_1.IMAGE_DIR}/${name}`);
};
exports.imagePath = imagePath;
const thumbPath = (name) => {
    return path_1.default.resolve(`${__dirname}/../${constants_1.THUMB_DIR}/${name}`);
};
exports.thumbPath = thumbPath;
const resizedName = (name, width, height) => {
    return `${name.split(".").shift()}-${width}x${height}.${name
        .split(".")
        .pop()}`;
};
exports.resizedName = resizedName;
const fileExists = (path) => {
    return fs_1.default.existsSync(path);
};
exports.fileExists = fileExists;
const writeThumbFile = (name, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, resize_1.default)((0, exports.imagePath)(name), width, height, (0, exports.thumbPath)((0, exports.resizedName)(name, width, height)));
});
exports.writeThumbFile = writeThumbFile;
