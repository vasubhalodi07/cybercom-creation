USE smartcart;

-- CATEGORY PROCEDURES
DROP PROCEDURE IF EXISTS categoriesProcedure;
DELIMITER //
CREATE PROCEDURE categoriesProcedure(
    IN operation VARCHAR(20),
    IN in_category_id INT,
    IN in_category_name VARCHAR(50))
BEGIN
    IF operation = "fetchCategory" THEN
		SELECT * FROM categories WHERE is_deleted=false;
    ELSEIF operation = "addCategory" THEN
        INSERT INTO categories (category_name) VALUES (in_category_name);
    ELSEIF operation = "updateCategory" THEN
        UPDATE categories SET category_name = in_category_name WHERE category_id = in_category_id;
    ELSEIF operation = "deleteCategory" THEN
        UPDATE categories SET is_deleted = true WHERE category_id=in_category_id;
    END IF;
END //
DELIMITER ;

CALL categoriesProcedure("fetchCategory", NULL, NULL);
CALL categoriesProcedure("addCategory", NULL, "New Category");
CALL categoriesProcedure("updateCategory", 6, "Updated Category");
CALL categoriesProcedure("deleteCategory", 6, NULL);
