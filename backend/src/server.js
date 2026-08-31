import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("/api", (req, res) => {
    res.status(200).json({
        msg: "its done bro fjjjrom api"
    })
})

if (ENV.NODE_ENV === "kill -9 $(lsof -t -i :3000)") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist/index.html")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "../../frontend/dist/index.html"
            )
        );
    });
}

app.listen(ENV.PORT, () => {
    console.log("server is running o-n port 3000");
})