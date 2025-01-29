CREATE TABLE recipes (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    output_amount numeric not null,
    item_id VARCHAR(255) not null,
    FOREIGN KEY (item_id) REFERENCES items(id)
);