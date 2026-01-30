import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PUBLIC_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : path.resolve(__dirname, "public");

app.use(express.static(PUBLIC_DIR));

app.get("/add", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, "html", "add.html"));
});


app.listen(4000, () => console.log("Server running on http://localhost:4000"));