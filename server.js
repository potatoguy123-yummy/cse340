import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";
const PORT = process.env.PORT?.toLowerCase() || 3000;
const HOST = process.env.HOST?.toLowerCase() || "0.0.0.0";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.get("/", async (req, res) => {
    const title = "Home";
    res.render("home", { title });
});

app.get("/organizations", async (req, res) => {
    const title = "Our Partner Organizations";
    res.render("organizations", { title });
});

app.get("/projects", async (req, res) => {
    const title = "Service Projects";
    res.render("projects", { title });
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});
