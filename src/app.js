import express from "express";
import { config } from "dotenv";
config({ path: "./.env" });
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/index.js";

const app = express();

// * Connect to database
connectDB();

// * Middlewares
app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// * Routes
import userRoutes from "./routes/user.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/activities", activityRoutes);
app.use("/api/v1/bookings", bookingRoutes);

// * Server Health Check
app.get("/api/v1/health", (req, res) => {
    return res.status(200).json(new ApiResponse(200, 'API is running'));
});

// * Wrong Endpoint show 404
app.use((req, res) => {
    return res.status(404).json(new ApiResponse(404, 'Route not found'));
})


export default app;