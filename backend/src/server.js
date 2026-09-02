import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API
app.get("/api", (req, res) => {
    res.status(200).json({
        msg: "its done bro from api"
    });
});

// Frontend
if (ENV.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../../frontend/dist");

    app.use(express.static(distPath));

    app.get("/{*any}", (req, res) => {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send("Frontend build not found. Run 'npm run build' to generate production files.");
        }
    });
}

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT} [NODE_ENV=${ENV.NODE_ENV}]`);
    if (ENV.NODE_ENV === "production") {
        console.log(`--> Single Server Mode: Both Frontend and Backend are running on http://localhost:${ENV.PORT}`);
    } else {
        console.log(`--> Development Mode: Backend API on http://localhost:${ENV.PORT} (Frontend runs separately on Vite dev server)`);
    }
});