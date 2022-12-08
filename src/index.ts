import express from "express"
import { apiRouter } from "./routes/api";


const app = express();
const port = 3000;

app.use("/api", apiRouter);

const server = app.listen(port);

export { server };