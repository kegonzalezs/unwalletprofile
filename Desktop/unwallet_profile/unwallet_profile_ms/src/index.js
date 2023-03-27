import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import Response from "./domain/response.js";
import HttpStatus from "./controller/user.controller.js";
import userRoutes from "./route/user.route.js";
import categoryRoutes from "./route/category.route.js";
import accountRoutes from "./route/account.route.js";
import logger from "./util/logger.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/users", userRoutes);

app.use("/categories", categoryRoutes);

app.use("/accounts", accountRoutes);

app.get("/", (req, res) =>
  res.send(
    new Response(
      HttpStatus.OK.code,
      HttpStatus.OK.status,
      "Patient API, v1.0.0 - All Systems Go"
    )
  )
);

app.all("*", (req, res) =>
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        "Route does not exist on the server"
      )
    )
);

app.listen(PORT, () =>
  logger.info(`Server running on: ${ip.address()}:${PORT}`)
);
