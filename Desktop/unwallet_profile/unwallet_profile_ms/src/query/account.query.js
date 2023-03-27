const accountsQuery = {
  SELECT_ACCOUNTS: "SELECT * FROM account ORDER BY created_at DESC LIMIT 100",
  SELECT_ACCOUNT: "SELECT * FROM account WHERE id = ?",
  CREATE_ACCOUNT: "INSERT INTO account(name, money) VALUES (?, ?)",
  UPDATE_ACCOUNT: "UPDATE account SET name = ?, money = ? WHERE id = ?",
  DELETE_ACCOUNT: "DELETE FROM account WHERE id = ?",
  CREATE_ACCOUNT_PROCEDURE: "CALL create_and_return_account(?, ?)",
};

export default accountsQuery;
