import sharp from "sharp";

export default async (
    inputPath: string,
    width: number,
    height: number,
    outPath: string
): Promise<void> => {
    await sharp(inputPath).resize(width, height).toFile(outPath);
};
