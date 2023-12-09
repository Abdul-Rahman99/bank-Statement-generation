const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const morgan = require("morgan");

const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddlewares")

const app = express();
app.use(bodyParser.json());

// Logging with Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Define routes
app.use("/", routes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});


// Global Errors Handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App Running on PORT ${PORT}`);
});

// Handling rejection outside Express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting Down Server......");
    process.exit(1);
  });
});
