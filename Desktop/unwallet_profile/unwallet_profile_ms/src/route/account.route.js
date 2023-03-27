import express from "express";
import {
  getAccounts,
  createAccount,
  getAccount,
  deleteAccount,
  updateAccount,
} from "../controller/account.controller.js";

const accountRoutes = express.Router();

accountRoutes.route("/").get(getAccounts).post(createAccount);

accountRoutes
  .route("/:id")
  .get(getAccount)
  .put(updateAccount)
  .delete(deleteAccount);

export default accountRoutes;
