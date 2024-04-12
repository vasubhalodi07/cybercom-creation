USE smartcart;

DROP PROCEDURE IF EXISTS orderProcedure;
DELIMITER //
CREATE PROCEDURE orderProcedure(
    IN operation VARCHAR(20),
    IN in_order_id INT,
    IN in_total_amount DECIMAL(10, 2),
    IN in_payment_status BOOLEAN,
    IN in_payment_method ENUM('COD', 'Razorpay'),
    IN in_razorpay_payment_id VARCHAR(255),
    IN in_address_id INT,
    IN in_customer_id INT
)
BEGIN
    IF operation = 'fetchOrder' THEN
        SELECT * FROM orders WHERE order_id = in_order_id;
    ELSEIF operation = 'addOrder' THEN
        INSERT INTO orders (total_amount, payment_status, payment_method, razorpay_payment_id, address_id, customer_id)
        VALUES (in_total_amount, in_payment_status, in_payment_method, in_razorpay_payment_id, in_address_id, in_customer_id);
    END IF;
END //
DELIMITER ;

CALL orderProcedure('fetchOrder', 1);
CALL orderProcedure('addOrder', null, 15000.00, false, 'COD', null, 5, 9);
