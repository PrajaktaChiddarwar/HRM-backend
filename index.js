import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDb from "./Database/connectDB.js";
dotenv.config({ path: path.resolve("./config.env") });
import adminRoute from "./Routes/AdminRoute.js";
import contractorRoute from "./Routes/ContractorRoute.js";
import cookieParser from 'cookie-parser';
import timesheetRoute from './Routes/TimesheetRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "http://localhost:5000",
  "http://localhost:6000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// database connection function
connectDb()
  .then((res) => {
    console.log("connection to database is successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", adminRoute);
app.use("/api", contractorRoute);
app.use("/api", timesheetRoute)


// app to listen on port function
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
