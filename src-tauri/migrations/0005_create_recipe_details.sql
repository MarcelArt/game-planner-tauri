CREATE TABLE recipe_details (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    input_amount numeric not null,
    item_id VARCHAR(255) not null,
    recipe_id VARCHAR(255) not null,
    FOREIGN KEY (item_id) REFERENCES items(id)
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);