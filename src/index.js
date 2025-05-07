import { config } from "dotenv";
config({ path: "./.env" });
import app from "./app.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is connected on PORT:${PORT}`);
});