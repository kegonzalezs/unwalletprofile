const usersQuery = {
  SELECT_USERS: "SELECT * FROM user ORDER BY created_at DESC LIMIT 100",
  SELECT_USER: "SELECT * FROM user WHERE id = ?",
  CREATE_USER: "INSERT INTO user(name, email, password) VALUES (?, ?, ?)",
  UPDATE_USER: "UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?",
  DELETE_USER: "DELETE FROM user WHERE id = ?",
  CREATE_USER_PROCEDURE: "CALL create_and_return_user(?, ?, ?)",
};

export default usersQuery;
