import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/account.query.js";
import HttpStatus from "./user.controller.js";

export const getAccounts = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching accounts`);
  database.query(QUERY.SELECT_ACCOUNTS, (error, results) => {
    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `No accounts found`
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
            { accounts: results }
          )
        );
    }
  });
};

export const createAccount = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating account`);
  database.query(
    QUERY.CREATE_ACCOUNT_PROCEDURE,
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
        //const account = { id: results.insertedId, ...req.body, created_at: new Date() };
        const account = results[0][0];
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              `Account created`,
              { account }
            )
          );
      }
    }
  );
};

export const getAccount = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching account`);
  database.query(QUERY.SELECT_ACCOUNT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Account by id ${req.params.id} was not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Account retrieved`,
            results[0]
          )
        );
    }
  });
};

export const updateAccount = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching account`);
  database.query(QUERY.SELECT_ACCOUNT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Account by id ${req.params.id} was not found`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating account`);
      database.query(
        QUERY.UPDATE_ACCOUNT,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  `Account updated`,
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

export const deleteAccount = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting account`);
  database.query(QUERY.DELETE_ACCOUNT, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Account deleted`,
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
            `Account by id ${req.params.id} was not found`
          )
        );
    }
  });
};

export default HttpStatus;
