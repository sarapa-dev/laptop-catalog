import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route";
import laptopRoute from "./routes/laptop.route";
import categoryRoute from "./routes/category.route";
import manufacturerRoute from "./routes/manufacturer.route";
import displayRoute from "./routes/display.route";
import gpuRoute from "./routes/gpu.route";
import processorRoute from "./routes/processor.route";
import storageRoute from "./routes/storage.route";
import paymentRoute from "./routes/payment.route";

dotenv.config();

const PORT = process.env.PORT || 5000;
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5173";
const app = express();

app.use(
  cors({
    origin: FRONTEND,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/laptop", laptopRoute);
app.use("/api/category", categoryRoute);
app.use("/api/manufacturer", manufacturerRoute);
app.use("/api/dispay", displayRoute);
app.use("/api/gpu", gpuRoute);
app.use("/api/processor", processorRoute);
app.use("/api/storage", storageRoute);
app.use("/api/payment", paymentRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
