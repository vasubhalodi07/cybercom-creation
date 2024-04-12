



-- fetch cart by customer_id (foreign key of customers table)
DELIMITER //
CREATE PROCEDURE fetchCartByCustomerId(IN in_customer_id INT)
BEGIN
	SELECT c.customer_id, c.customer_name, ca.cart_id, ca.quantity, s.packaging_size, s.packaging_price, s.stock, p.product_id, p.product_name, p.product_description, p.product_image
	FROM customers c
	INNER JOIN carts ca ON ca.customer_id = c.customer_id
	INNER JOIN skus s ON s.sku_id = ca.sku_id AND s.is_deleted = false
	INNER JOIN products p ON p.product_id = s.product_id AND p.is_deleted = false
	WHERE c.customer_id = in_customer_id;
END //
DELIMITER ;
CALL fetchCartByCustomerId(1);

-- fetch cart by cart_id (primary key)
DELIMITER //
CREATE PROCEDURE fetchCartByCartId(IN in_cart_id INT)
BEGIN
	SELECT c.cart_id, c.quantity, c.discount, c.tax, s.packaging_size, s.packaging_price, s.stock, p.product_id, p.product_name, p.product_description, p.product_image
    FROM carts c
    INNER JOIN skus s
    ON s.sku_id = c.sku_id
    INNER JOIN products p
    ON p.product_id = s.product_id
    WHERE c.cart_id = in_cart_id;
END //
DELIMITER ;
CALL fetchCartByCartId(3);

