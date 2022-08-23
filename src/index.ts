import express from "express";
import imagesRoutes from "./routes/images";

const app = express();
const port = 3000;
app.use("/api", imagesRoutes);

app.listen(port, () => {
    console.log("starting server at " + port);
});

export default app;
