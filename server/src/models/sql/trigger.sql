-- trigger on storing user's Email as lower case 
CREATE OR REPLACE FUNCTION lowercase_email_registration_fn()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email := LOWER(NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER lowercase_email_trigger
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION lowercase_email_registration_fn();

-- trigger on removal of items from user cart when the quantity is 0 

CREATE OR REPLACE FUNCTION carts_zero_QTY_items_removal()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity = 0  THEN
    	DELETE FROM users_carts
			WHERE 
				user_id = OLD.user_id
      AND
      	product_id = OLD.product_id;  
    	RETURN OLD;
    END IF; 
    RETURN NEW; 
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER users_carts_zero_item_trigger
AFTER UPDATE ON users_carts
FOR EACH ROW
WHEN (NEW.quantity = 0 ) 
EXECUTE FUNCTION carts_zero_QTY_items_removal(); 