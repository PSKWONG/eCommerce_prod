-- Create User Table 
create table users (
    id Serial Primary Key,
    user_name varchar(20),
    email varchar(50) Unique,
    password varchar(100),
    isLocal boolean
);

-- Create Provider Table 
create table providers (
  id Serial Primary Key,
  provider varchar(50) Unique
);


-- Create Linked Account Table
create table linked_accounts (
  id Serial Primary Key,
  user_id integer,
  provider_id integer,
  profile_id varchar(100),
  profile_data JSON,
  access_token text,
  refresh_token text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users
    FOREIGN KEY (user_id) 
      REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT fk_providers
    FOREIGN KEY (provider_id) 
      REFERENCES providers(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  CONSTRAINT unique_user_provider
    UNIQUE (user_id , provider_id)
);





-- Create Session Table 
Create table sessions (
    sid varchar(100) Primary Key,
    sess json not null,
    expire timestamp not null
);

-- Create products Table 
Create table products (
    id Serial Primary Key,
    product_name varchar(100) not null,
    description text,
    image_path VARCHAR(255),
    unit_price NUMERIC(10,2) not null
);

-- Create categories Table 
Create table categories (
    id Serial Primary Key,
    category_name varchar(50) not null
);

-- Create order Table 
Create table orders (
    id Serial Primary Key,
    order_date TIMESTAMP,
    delivery_date date,
    cart_record JSON not null, 
    cost NUMERIC(10,2) not null,
    client_secret varchar(300) Unique,
    payment_id varchar(300) Unique, 
    user_id integer,
    non_user_profile JSON,
    CONSTRAINT fk_user
      FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


--- Create a relationship table user_cart
CREATE TABLE users_carts(
	user_id INTEGER, 
  product_id INTEGER,
  quantity INTEGER,
  CONSTRAINT fk_user
  	FOREIGN KEY (user_id)
  	  REFERENCES users(id)
		  ON DELETE CASCADE
		  ON UPDATE CASCADE,
  CONSTRAINT fk_products
  	FOREIGN KEY (product_id)
  	  REFERENCES products(id)
		  ON DELETE CASCADE
		  ON UPDATE CASCADE
); 



--- Create a relationship order_product
Create table orders_products (
    order_id integer ,
    product_id integer ,
    CONSTRAINT fk_order
      FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_products
      FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

--- Create a relationship products_categories
Create table products_categories (
    product_id integer,
    categories_id integer,
    CONSTRAINT fk_categories
      FOREIGN KEY (categories_id)
      REFERENCES categories(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_products
      FOREIGN KEY (product_id)
      REFERENCES products(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);