USE smartcart;

DROP PROCEDURE IF EXISTS cartProcedure;
DELIMITER //
CREATE PROCEDURE cartProcedure(IN operation VARCHAR(20), IN in_cart_id INT, IN in_quantity INT, IN in_customer_id INT, IN in_sku_id INT)
BEGIN
	IF operation = "fetchByCartId" THEN
		SELECT * FROM carts WHERE cart_id=in_cart_id AND is_deleted=false;
        
	ELSEIF operation = "fetchByCustomerId" THEN
		SELECT c.customer_id, c.customer_name, ca.cart_id, ca.quantity, s.packaging_size, s.packaging_price, s.stock, p.product_id, p.product_name, p.product_description, p.product_image
		FROM customers c
		INNER JOIN carts ca ON ca.customer_id = c.customer_id AND ca.is_deleted=false
		INNER JOIN skus s ON s.sku_id = ca.sku_id AND s.is_deleted = false
		INNER JOIN products p ON p.product_id = s.product_id AND p.is_deleted = false
		WHERE c.customer_id = in_customer_id;
        
	ELSEIF operation = "AddToCart" THEN
		INSERT INTO carts (`quantity`, `customer_id`, `sku_id`) VALUES (in_quantity, in_customer_id, in_sku_id);
        
	ELSEIF operation = "UpdateQuantity" THEN
		UPDATE carts SET quantity=in_quantity WHERE cart_id=in_cart_id AND is_deleted=false;
        
	ELSEIF operation = "SoftDeleteCart" THEN
		UPDATE carts SET is_deleted=true WHERE cart_id=in_cart_id;
        
	END IF;
END//
DELIMITER ;

SELECT * FROM carts;
CALL cartProcedure("fetchByCartId", 2, null, null, null);
CALL cartProcedure("fetchByCustomerId", null, null, 1, null);
CALL cartProcedure("AddToCart", null, 500, 1, 7);
CALL cartProcedure("UpdateQuantity", 12, 100, null, null);
CALL cartProcedure("SoftDeleteCart", 12, null, null, null);

