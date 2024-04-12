USE smartcart;
SELECT * FROM customers;

DROP PROCEDURE IF EXISTS customerProcedure;
DELIMITER //
CREATE PROCEDURE customerProcedure(
	IN operation VARCHAR(20),
    IN in_customer_id INT, 
    IN in_customer_name VARCHAR(50), 
    IN in_customer_email VARCHAR(50), 
    IN in_customer_password VARCHAR(50),
    IN in_old_password VARCHAR(50))
BEGIN
	IF operation = "fetchCustomer" THEN
		SELECT * FROM customers;
	ELSEIF operation = "registerCustomer" THEN
		INSERT INTO customers (`customer_name`, `customer_email`, `customer_password`) VALUES (in_customer_name, in_customer_email, in_customer_password);
	ELSEIF operation = "loginCustomer" THEN
		SELECT * FROM customers WHERE customer_email=in_customer_email AND customer_password=in_customer_password;
	ELSEIF operation = "forgotPassword" THEN
		UPDATE customers SET customer_password=in_customer_password WHERE customer_email=in_customer_email;
	ELSEIF operation = "changePassword" THEN
		UPDATE customers SET customer_password=in_customer_password WHERE customer_id=in_customer_id AND customer_password=in_old_password;
	END IF;
END//
DELIMITER ;

CALL customerProcedure("fetchCustomer", null, null, null, null, null);
CALL customerProcedure("registerCustomer", null, 'demo-record', 'demo@gmail.com', '1234', null);
CALL customerProcedure("loginCustomer", null, null, "demo@gmail.com", "1234", null);
CALL customerProcedure("forgotPassword", null, null, 'demo@gmail.com', '5678', null);
CALL customerProcedure("changePassword", 11, null, null, '0000', '5678');

