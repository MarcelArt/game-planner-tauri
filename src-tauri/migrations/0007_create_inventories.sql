CREATE TABLE inventories (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    amount real not null,
    item_id VARCHAR(255) not null,
    FOREIGN KEY (item_id) REFERENCES items(id)
);