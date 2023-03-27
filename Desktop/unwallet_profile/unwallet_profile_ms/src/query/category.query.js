const categorysQuery = {
  SELECT_CATEGORYS: "SELECT * FROM category ORDER BY created_at DESC LIMIT 100",
  SELECT_CATEGORY: "SELECT * FROM category WHERE id = ?",
  CREATE_CATEGORY: "INSERT INTO category(name) VALUES (?)",
  UPDATE_CATEGORY: "UPDATE category SET name = ? WHERE id = ?",
  DELETE_CATEGORY: "DELETE FROM category WHERE id = ?",
  CREATE_CATEGORY_PROCEDURE: "CALL create_and_return_category(?)",
};

export default categorysQuery;
