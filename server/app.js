const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const projectRoute = require("./routes/projectRoute");
const userRoute = require("./routes/userRoute");
const latestRoute = require("./routes/latestRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const searchRoute = require("./routes/searchRoute");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");

const app = express();

const frontendOrigin = process.env.PROD_CLIENT;

// CORS configuration
const corsOptions = {
	origin: frontendOrigin,
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"],
	methods: ["GET", "POST", "PATCH", "DELETE"],
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Other middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/latest", latestRoute);

// Handle undefined routes
app.all("*", (req, res, next) =>
	next(new AppError(`Can't find ${req.originalUrl} in this server`, 404))
);

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
