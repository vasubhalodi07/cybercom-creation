USE smartcart;

TRUNCATE categories;
TRUNCATE products;
TRUNCATE skus;

SELECT * FROM categories;
SELECT * FROM products;
SELECT * FROM skus;
SELECT * FROM customers;
SELECT * FROM address;
SELECT * FROM wishlists;
SELECT * FROM carts;

-- CATEGORIES RECORDS
INSERT INTO categories (`category_name`) VALUES ("Fruits"), ("Vegetables"), ("Dairy & Eggs"), ("Beverages"), ("Snacks");

-- PRODUCTS RECORDS
INSERT INTO products (product_name, product_description, product_image, category_id)
VALUES 
    ('Banana', 'Sweet and ripe bananas', 'banana.jpg', 1),
    ('Grapes', 'Juicy and seedless grapes', 'grapes.jpg', 1),
    ('Watermelon', 'Refreshing and hydrating watermelon', 'watermelon.jpg', 1),
    ('Carrot', 'Fresh and crunchy carrots', 'carrot.jpg', 2),
    ('Tomato', 'Plump and flavorful tomatoes', 'tomato.jpg', 2),
    ('Cucumber', 'Crisp and cooling cucumbers', 'cucumber.jpg', 2),
    ('Eggs', 'Farm-fresh eggs', 'eggs.jpg', 3),
    ('Butter', 'Creamy and rich butter', 'butter.jpg', 3),
    ('Cheese', 'Variety of cheese options', 'cheese.jpg', 3),
    ('Orange Juice (Pack of 6)', 'Convenient pack of 6 bottles', 'orange_juice_pack.jpg', 4),
    ('Green Tea', 'Healthy and antioxidant-rich green tea', 'green_tea.jpg', 4),
    ('Cola', 'Classic cola drink', 'cola.jpg', 4),
    ('Potato Chips (Family Pack)', 'Large family-size pack of chips', 'potato_chips_family.jpg', 5),
    ('Popcorn', 'Buttery and delicious popcorn', 'popcorn.jpg', 5),
    ('Chocolate Bar', 'Indulgent chocolate treat', 'chocolate_bar.jpg', 5);

-- SKUS RECORDS
INSERT INTO skus (packaging_size, packaging_price, stock, product_id)
VALUES 
    ('1 kg', 1.99, 100, 1),
    ('500 g', 1.49, 80, 1),
    ('1 unit', 3.99, 120, 1),
    ('500 g', 1.49, 80, 2),
    ('1 kg', 2.49, 100, 2),
    ('250 g', 1.49, 100, 2),
    ('1 unit', 3.99, 120, 3),
    ('Dozen', 2.99, 150, 3),
    ('1 kg', 3.49, 100, 3),
    ('250 g', 1.99, 100, 4),
    ('Dozen', 2.99, 150, 4),
    ('500 g', 2.49, 100, 5),
    ('1 kg', 4.99, 80, 5),
    ('2 kg', 7.99, 50, 5),
    ('500 g', 1.99, 80, 6),
    ('1 kg', 3.49, 100, 6),
    ('Dozen', 4.99, 120, 7),
    ('1 unit', 1.99, 200, 7),
    ('Pack of 6', 3.99, 150, 8),
    ('Pack of 12', 7.99, 100, 8),
    ('500 g', 2.99, 80, 9),
    ('1 kg', 5.99, 100, 9),
    ('250 g', 1.99, 100, 9),
    ('1 liter', 2.49, 100, 10),
    ('2 liter', 4.49, 80, 10),
    ('Pack of 6', 3.99, 120, 11),
    ('Pack of 12', 7.49, 100, 11),
    ('100 bags', 1.99, 200, 12),
    ('500 bags', 8.99, 150, 12),
    ('1 liter', 2.49, 100, 13),
    ('2 liter', 3.99, 80, 13),
    ('Family Pack', 6.99, 50, 14),
    ('Party Pack', 12.99, 30, 14),
    ('Large', 1.99, 100, 15),
    ('Small', 0.99, 200, 15),
    ('Medium', 1.49, 150, 15);

-- CUSTOMERS RECORDS
INSERT INTO customers (customer_name, customer_email, customer_password)
VALUES 
    ('John Doe', 'john@example.com', 'password1'),
    ('Alice Smith', 'alice@example.com', 'password2'),
    ('Bob Johnson', 'bob@example.com', 'password3'),
    ('Emma Wilson', 'emma@example.com', 'password4'),
    ('Michael Brown', 'michael@example.com', 'password5'),
    ('Sophia Martinez', 'sophia@example.com', 'password6'),
    ('James Anderson', 'james@example.com', 'password7'),
    ('Olivia Lee', 'olivia@example.com', 'password8'),
    ('William Taylor', 'william@example.com', 'password9'),
    ('Ava Harris', 'ava@example.com', 'password10');

-- ADDRESS RECORDS
INSERT INTO address (address_name, locality, phonenumber, pincode, state, city, customer_id, is_default)
VALUES 
    ('Home', '123 Main St', '123-456-7890', 12345, 'California', 'Los Angeles', 1, true),
    ('Work', '456 Business Ave', '987-654-3210', 54321, 'California', 'San Francisco', 1, false),
    ('Home', '789 Elm St', '111-222-3333', 67890, 'New York', 'New York City', 2, true),
    ('Work', '246 Pine St', '555-555-5555', 54321, 'New York', 'Albany', 2, false),
    ('Home', '101 Oak St', '999-888-7777', 11111, 'Texas', 'Houston', 3, true),
    ('Cottage', 'Lakeview Dr', '333-222-1111', 22222, 'Texas', 'Austin', 3, false),
    ('Apartment', '789 Maple St', '666-777-8888', 33333, 'Florida', 'Miami', 4, true),
    ('Work', '888 Pineapple Ave', '444-444-4444', 44444, 'Florida', 'Orlando', 4, false),
    ('Home', '555 Palm St', '222-333-4444', 55555, 'Washington', 'Seattle', 5, true),
    ('Office', '777 Cherry St', '777-777-7777', 66666, 'Washington', 'Spokane', 5, false),
    ('Home', '999 Cedar St', '999-999-9999', 77777, 'Arizona', 'Phoenix', 6, true),
    ('Work', '222 Pine St', '888-888-8888', 88888, 'Arizona', 'Tucson', 6, false),
    ('Home', '333 Elm St', '111-111-1111', 99999, 'Colorado', 'Denver', 7, true),
    ('Work', '444 Oak St', '222-222-2222', 10101, 'Colorado', 'Colorado Springs', 7, false),
    ('Home', '555 Maple St', '333-333-3333', 11111, 'Illinois', 'Chicago', 8, true),
    ('Work', '666 Pine St', '444-444-4444', 22222, 'Illinois', 'Springfield', 8, false),
    ('Home', '777 Oak St', '555-555-5555', 33333, 'Michigan', 'Detroit', 9, true),
    ('Work', '888 Maple St', '666-666-6666', 44444, 'Michigan', 'Lansing', 9, false),
    ('Home', '999 Pine St', '777-777-7777', 55555, 'Ohio', 'Columbus', 10, true),
    ('Work', '111 Cherry St', '888-888-8888', 66666, 'Ohio', 'Cleveland', 10, false);

-- WISHLIST
INSERT INTO wishlists (customer_id, sku_id)
VALUES 
    (1, 1),
    (1, 2),
    (2, 5),
    (3, 11),
    (4, 15),
    (4, 16),
    (5, 21),
    (5, 22),
    (6, 25),
    (6, 26);
    
-- CART RECORDS
INSERT INTO carts (quantity, customer_id, sku_id)
VALUES 
    (2, 1, 1),
    (1, 1, 2),
    (3, 2, 5),
    (1, 2, 6),
    (2, 3, 11),
    (1, 4, 15),
    (2, 4, 16),
    (1, 5, 21),
    (2, 5, 22),
    (3, 6, 26),
    (1, 6, 27);

-- ORDER
INSERT INTO orders (total_amount, payment_status, payment_method, razorpay_payment_id, address_id, customer_id)
VALUES 
	(10000, false, "COD", null, 1, 1),
    (13000, false, "COD", null, 4, 7),
    (15000, false, "COD", null, 5, 9),
    (1000, false, "COD", null, 5, 10),
    (40000, true, "Razorpay", "razorpay-id-1020202", 2, 1),
    (4000, true, "Razorpay", "razorpay-id-102", 4, 7),
    (420000, true, "Razorpay", "razorpay-id-103", 5, 9),
    (4260000, true, "Razorpay", "razorpay-id-104", 5, 10);

-- ORDERITEM
INSERT INTO orderItems (quantity, packaging_size, packaging_price, product_id, order_id)
VALUES 
    (2, '1 kg', 1.99, 1, 1),
    (3, '500 g', 1.49, 1, 2),
    (1, '1 unit', 3.99, 1, 1),
	(1, '500 g', 1.49, 2, 5),
    (2, '1 kg', 2.49, 2, 6),
    (1, '250 g', 1.49, 2, 5),
    (3, '1 unit', 3.99, 8, 6),
    (2, 'Dozen', 2.99, 8, 7),
    (1, '1 kg', 3.49, 8, 1);      

