-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;


CREATE TABLE tag (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_name STRING
);

CREATE TABLE productTag (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES product (id),
    tag_id INT, 
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);

