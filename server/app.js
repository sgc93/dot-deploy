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

// Define allowed frontend origin
const frontendOrigin = "https://dot-code-nu.vercel.app";

// Configure CORS to allow requests from your frontend origin
app.use(
	cors({
		origin: frontendOrigin,
		credentials: true,
	})
);

// Optionally, add more headers if needed
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", frontendOrigin);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/", (req, res, next) =>
	res.status(200).json({
		status: success,
		message: "hi there",
	})
);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/latest", latestRoute);

app.all("*", (req, res, next) =>
	next(new AppError(`Can't find ${req.originalUrl} in this server`, 404))
);

// handle undefined routes
app.use(globalErrorHandler);

module.exports = app;
