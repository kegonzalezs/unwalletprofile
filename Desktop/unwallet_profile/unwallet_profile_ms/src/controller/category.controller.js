import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/category.query.js";
import HttpStatus from "./user.controller.js";

export const getCategories = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching categories`);
  database.query(QUERY.SELECT_CATEGORYS, (error, results) => {
    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `No categories found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Categories retrieved`,
            { categorys: results }
          )
        );
    }
  });
};

export const createCategory = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating category`);
  database.query(
    QUERY.CREATE_CATEGORY_PROCEDURE,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        logger.error(error.message);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              `Error occurred`
            )
          );
      } else {
        //const category = { id: results.insertedId, ...req.body, created_at: new Date() };
        const category = results[0][0];
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              `Category created`,
              { category }
            )
          );
      }
    }
  );
};

export const getCategory = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching category`);
  database.query(QUERY.SELECT_CATEGORY, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Category by id ${req.params.id} was not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Category retrieved`,
            results[0]
          )
        );
    }
  });
};

export const updateCategory = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching category`);
  database.query(QUERY.SELECT_CATEGORY, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Category by id ${req.params.id} was not found`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating category`);
      database.query(
        QUERY.UPDATE_CATEGORY,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  `Category updated`,
                  { id: req.params.id, ...req.body }
                )
              );
          } else {
            logger.error(error.message);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  `Error occurred`
                )
              );
          }
        }
      );
    }
  });
};

export const deleteCategory = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting category`);
  database.query(QUERY.DELETE_CATEGORY, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Category deleted`,
            results[0]
          )
        );
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Category by id ${req.params.id} was not found`
          )
        );
    }
  });
};

export default HttpStatus;
