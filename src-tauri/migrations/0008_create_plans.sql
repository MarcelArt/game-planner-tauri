CREATE TABLE plans (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    goal real not null,
    item_id VARCHAR(255) not null,
    FOREIGN KEY (item_id) REFERENCES items(id)
);