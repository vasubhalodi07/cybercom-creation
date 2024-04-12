USE smartcart;

-- WISHLIST PROCEDURES
DROP PROCEDURE IF EXISTS wishlistProcedure;
DELIMITER //
CREATE PROCEDURE wishlistProcedure(
    IN operation VARCHAR(20),
    IN in_wishlist_id INT,
    IN in_customer_id INT,
    IN in_sku_id INT)
BEGIN
    IF operation = "fetchWishlist" THEN
        SELECT w.wishlist_id, p.product_id, p.product_name, p.product_description, p.product_image,
               s.sku_id, s.packaging_size, s.packaging_price, s.stock, s.discount
        FROM wishlists w
        INNER JOIN skus s ON w.sku_id = s.sku_id AND s.is_deleted = false
        INNER JOIN products p ON s.product_id = p.product_id AND p.is_deleted = false
        WHERE w.is_deleted = false;
	
    ELSEIF operation = "addWishlist" THEN
        INSERT INTO wishlists (customer_id, sku_id) VALUES (in_customer_id, in_sku_id);
        
    ELSEIF operation = "updateWishlist" THEN
        UPDATE wishlists SET sku_id = in_sku_id WHERE wishlist_id = in_wishlist_id;
	
    ELSEIF operation = "deleteWishlist" THEN
        UPDATE wishlists SET is_deleted = true WHERE wishlist_id = in_wishlist_id;
        
    END IF;
END //
DELIMITER ;

CALL wishlistProcedure("fetchWishlist", null, null, null);
CALL wishlistProcedure("addWishlist", null, 1, 3);
CALL wishlistProcedure("updateWishlist", 21, null, 4);
CALL wishlistProcedure("deleteWishlist", 21, null, null);

