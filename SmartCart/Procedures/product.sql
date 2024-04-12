USE smartcart;

-- PRODUCT PROCEDURES
DROP PROCEDURE IF EXISTS productProcedure;
DELIMITER //
CREATE PROCEDURE productProcedure(
	IN operation VARCHAR(20),
    IN in_product_id INT,
    IN in_product_name VARCHAR(50),
    IN in_product_description VARCHAR(50),
    IN in_product_image VARCHAR(50),
    IN in_category_id INT,
    IN in_search_term VARCHAR(50))
BEGIN
	IF operation = "fetchProducts" THEN
		SELECT p.product_id, p.product_name, p.product_description, p.product_image
		FROM products p
		LEFT JOIN skus s ON p.product_id = s.product_id AND s.is_deleted=false
		LEFT JOIN categories c ON c.category_id = p.category_id AND c.is_deleted=false
		WHERE (in_search_term IS NULL OR 
			p.product_name LIKE CONCAT('%', in_search_term , '%') OR
			p.product_description LIKE CONCAT('%', in_search_term , '%'))
			AND (in_category_id IS NULL OR p.category_id = in_category_id)
			AND p.is_deleted = false
		GROUP BY p.product_id;

	ELSEIF operation = "fetchProductsById" THEN
		SELECT 
			p.product_id, p.product_name, p.product_description, p.product_image, 
            s.sku_id, s.packaging_size, s.packaging_price, s.stock, s.discount,
            c.category_name
        FROM products p
        LEFT JOIN skus s ON p.product_id = s.product_id AND s.is_deleted=false
		LEFT JOIN categories c ON c.category_id = p.category_id AND c.is_deleted=false
        WHERE p.product_id=in_product_id AND p.is_deleted=false;
        
	ELSEIF operation = "addProduct" THEN
		INSERT INTO products (`product_name`, `product_description`, `product_image`, `category_id`) 
        VALUES (in_product_name, in_product_description, in_product_image, in_category_id);
        
	ELSEIF operation = "updateProduct" THEN
		UPDATE products SET product_name=in_product_name, product_description=in_product_description,
		product_image=in_product_image, category_id=in_category_id WHERE product_id=in_product_id;
        
	ELSEIF operation = "deleteProduct" THEN
		UPDATE products SET is_deleted=true WHERE product_id=in_product_id;

    END IF;
END //
DELIMITER ;

CALL productProcedure("fetchProducts", null, null, null, null, null, null); # Fetch all products
CALL productProcedure("fetchProducts", null, null, null, null, null, "gr"); # Search for products by name, description
CALL productProcedure("fetchProducts", null, null, null, null, 1, null); # Filter products by category
CALL productProcedure("fetchProducts", null, null, null, null, 1, "ba"); # Combine filters, search

CALL productProcedure("fetchProductsById", 18, null, null, null, null, null);
CALL productProcedure("addProduct", null, "demo-product", "demo-product-description", "image.jpg", 1, null);
CALL productProcedure("updateProduct", 18, "update-product", "update-description", "update.png", 1, null);
CALL productProcedure("deleteProduct", 18, null, null, null, null, null);


-- SKU PROCEDURE
DROP PROCEDURE IF EXISTS skuProcedure;
DELIMITER //
CREATE PROCEDURE skuProcedure(
    IN operation VARCHAR(20),
    IN in_sku_id INT,
    IN in_packaging_size VARCHAR(50),
    IN in_packaging_price DECIMAL(10, 2),
    IN in_stock INT,
    IN in_discount INT,
    IN in_product_id INT)
BEGIN
    IF operation = "addSkus" THEN
        INSERT INTO skus (packaging_size, packaging_price, stock, discount, product_id)
        VALUES (in_packaging_size, in_packaging_price, in_stock, in_discount, in_product_id);
    ELSEIF operation = "updateSkus" THEN
        UPDATE skus SET packaging_size = in_packaging_size, packaging_price = in_packaging_price, stock = in_stock, discount = in_discount
        WHERE sku_id = in_sku_id;
    ELSEIF operation = "deleteSkus" THEN
        UPDATE skus
        SET is_deleted = true
        WHERE sku_id = in_sku_id;
    END IF;
END //
DELIMITER ;

SELECT * FROM skus WHERE is_deleted=false;
CALL skuProcedure("addSkus", null, 'Small', 10.99, 100, 0, 1);
CALL skuProcedure("updateSkus", 1, 'Large', 15.99, 150, 5, null);
CALL skuProcedure("deleteSkus", 1, null, null, null, null, null);


/*
	SELECT p.product_id, p.product_name, p.product_description, p.product_image, s.sku_id, s.packaging_size, s.packaging_price, s.stock, s.discount, c.category_name
	FROM products p
	INNER JOIN skus s ON p.product_id = s.product_id AND s.is_deleted = false
	INNER JOIN categories c ON c.category_id = p.category_id
	WHERE (in_product_name IS NULL OR p.product_name LIKE CONCAT('%', in_product_name, '%'))
	AND (in_product_description IS NULL OR p.product_description LIKE CONCAT('%', in_product_description, '%'))
	AND (in_category_id IS NULL OR p.category_id = in_category_id)
	AND p.is_deleted = false;
*/
