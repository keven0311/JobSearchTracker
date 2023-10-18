import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import applicationRoute from "./routes/applicationsRoute.js";
import cors from "cors";

const app = express();

//Middleware for cross-origin resource sharing:
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//Middleware for parsing request body
app.use(express.json());

app.use("/applications", applicationRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to mongoose database");
    app.listen(PORT, () => {
      console.log(`App is listen on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
