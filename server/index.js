import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import connectDB from "./utils/db.config";
import cors from "cors";

import authRouter from "./routes/auth";
import reviewsRouter from "./routes/reviews";
import apartmentRouter from "./routes/apartment";

import seedData from "./seed";
import fileRouter from "./routes/file";

require("dotenv").config();
connectDB(process.env.NODE_ENV); //Database connection.
// seedData();

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Attach Route Handlers
app.get("/", (req, res) => {
    res.json({ message: "welcome to my revie-app api" });
});
app.use("/api/v1/auth/", authRouter(express.Router()));
app.use("/api/v1/apartments/", apartmentRouter(express.Router()));
app.use("/api/v1/reviews/", reviewsRouter(express.Router()));
app.use("/api/v1/file/", fileRouter(express.Router()));

// Error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});

//Handle 404 Error
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

export default app;