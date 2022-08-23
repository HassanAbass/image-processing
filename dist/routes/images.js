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
const express_1 = __importDefault(require("express"));
const file_1 = require("../libs/file");
const router = express_1.default.Router();
router.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let width = parseInt(req.query.width);
    let height = parseInt(req.query.height);
    let fileName = req.query.fileName;
    try {
        if (!fileName)
            throw "Provide image name, 'fileName' key is requried.";
        if (!width || !height)
            throw "Provide image width and height.";
        if (!(0, file_1.fileExists)((0, file_1.imagePath)(fileName)))
            throw "File not found.";
        if ((0, file_1.fileExists)((0, file_1.thumbPath)((0, file_1.resizedName)(fileName, width, height))))
            return res.sendFile((0, file_1.thumbPath)((0, file_1.resizedName)(fileName, width, height)));
        console.log("creating");
        yield (0, file_1.writeThumbFile)(fileName, width, height);
        res.sendFile((0, file_1.thumbPath)((0, file_1.resizedName)(fileName, width, height)));
    }
    catch (e) {
        res.status(422).send(e);
    }
}));
exports.default = router;
