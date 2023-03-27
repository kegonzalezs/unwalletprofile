import express from "express";
import {
  getCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../controller/category.controller.js";

const categoryRoutes = express.Router();

categoryRoutes.route("/").get(getCategories).post(createCategory);

categoryRoutes
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default categoryRoutes;
