USE smartcart;

DROP PROCEDURE IF EXISTS addressProcedure;
DELIMITER //
CREATE PROCEDURE addressProcedure(
    IN operation VARCHAR(50), 
    IN in_address_id INT, 
    IN in_customer_id INT,
    IN in_name VARCHAR(50), 
    IN in_locality TEXT, 
    IN in_phonenumber VARCHAR(50),
    IN in_pincode INT,
    IN in_state VARCHAR(50),
    IN in_city VARCHAR(50),
    IN in_is_default BOOLEAN, 
    OUT address_count INT)
BEGIN    
    IF operation = "fetchAddress" THEN
        SELECT * FROM address WHERE is_deleted=false;
        
    ELSEIF operation = "fetchAddressById" THEN
        SELECT * FROM address WHERE customer_id = in_customer_id AND is_deleted=false;
        
	ELSEIF operation = "fetchAddressByCustomerId" THEN
        SELECT * FROM address WHERE address_id = in_address_id AND is_deleted=false;
        
    ELSEIF operation = "addAddress" THEN
        SELECT COUNT(*) INTO address_count FROM address WHERE customer_id=in_customer_id AND is_default=true;
        IF address_count <= 0 THEN 
			SET in_is_default = true;
        ELSEIF in_is_default=true AND address_count > 0 THEN
			UPDATE address SET `is_default`=false WHERE customer_id=in_customer_id AND is_deleted=false;
		END IF;
        INSERT INTO address (`address_name`, `locality`, `phonenumber`, `pincode`, `state`, `city`, `customer_id`, `is_default`)
        VALUES (in_name, in_locality, in_phonenumber, in_pincode, in_state, in_city, in_customer_id, in_is_default);
        
    ELSEIF operation = "updateAddress" THEN
		IF in_is_default=true THEN
			UPDATE address SET `is_default`=false WHERE customer_id=in_customer_id AND is_deleted=false;
		END IF;
        UPDATE address SET `address_name` = in_name, `locality` = in_locality, `phonenumber` = in_phonenumber, `pincode` = in_pincode, 
		`state` = in_state, `city` = in_city, `is_default` = in_is_default WHERE address_id = in_address_id;

    ELSEIF operation = "changeDefaultAddress" THEN
		UPDATE address SET `is_default`=false WHERE customer_id=in_customer_id AND is_deleted=true;
        UPDATE address SET `is_default`=in_is_default WHERE address_id = in_address_id AND is_deleted=false;
        
	ELSEIF operation = "deleteAddress" THEN
		SELECT COUNT(*) INTO address_count FROM address WHERE address_id=in_address_id AND is_default=true;
        IF address_count <= 0 THEN
			UPDATE address SET is_deleted=true WHERE address_id = in_address_id;
		END IF;
    END IF;
END //
DELIMITER ;

CALL addressProcedure("fetchAddress", null, null, null, null, null, null, null, null, null, @address_count);
CALL addressProcedure("fetchAddressById", null, 1, null, null, null, null, null, null, null, @address_count);
CALL addressProcedure("fetchAddressByCustomerId", 1, null, null, null, null, null, null, null, null, @address_count);
CALL addressProcedure("addAddress", null, 1, "abcd", "this is demo address", "9913250232", 212121, "Xyz", "abcd", false, @address_count);
CALL addressProcedure("updateAddress", 1, 1, "Address", "Locality", "1234242324", 3242, "State", "City", true, @address_count);
CALL addressProcedure("changeDefaultAddress", 28, 1, null, null, null, null, null, null, true, @address_count);
CALL addressProcedure("deleteAddress", 28, null, null, null, null, null, null, null, null, @address_count);

