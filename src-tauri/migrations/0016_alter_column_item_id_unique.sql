DROP VIEW v_plan_details;

-- Step 1: Create a new table with the UNIQUE constraint
CREATE TABLE inventories_new (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    amount INTEGER NOT NULL,
    item_id VARCHAR(255) NOT NULL UNIQUE, -- Added UNIQUE constraint
    FOREIGN KEY (item_id) REFERENCES items(id)
);

-- Step 2: Copy data from old table to new table
INSERT INTO inventories_new (id, amount, item_id)
SELECT id, amount, item_id FROM inventories;

-- Step 3: Drop the old table
DROP TABLE inventories;

-- Step 4: Rename the new table to match the old name
ALTER TABLE inventories_new RENAME TO inventories;

CREATE VIEW IF NOT EXISTS
v_plan_details AS
SELECT
    p.id AS id,
    p.goal AS goal,
    output.name AS output_item_name,
    input.id AS input_item_id,
    input.name AS input_item_name,
    input.picture AS input_item_picture,
    COALESCE(
        CAST(
            (CAST(p.goal AS REAL) / r.output_amount) * rd.input_amount +
            (CASE 
                WHEN (CAST(p.goal AS REAL) / r.output_amount) * rd.input_amount > CAST((CAST(p.goal AS REAL) / r.output_amount) * rd.input_amount AS INT) 
                THEN 1 
                ELSE 0 
            END) 
        AS INT), 
        0
    ) AS required_amount,
    output.id AS output_item_id,
    output.picture AS output_item_picture,
    own.amount AS input_amount_owned,
    COALESCE(
        MAX(
            CAST(
                (CAST(p.goal AS REAL) / r.output_amount) * rd.input_amount +
                (CASE 
                    WHEN (CAST(p.goal AS REAL) / r.output_amount) * rd.input_amount > CAST((CAST(p.goal AS REAL) / r.output_amount) * rd.input_amount AS INT) 
                    THEN 1 
                    ELSE 0 
                END) 
            AS INT) - own.amount, 
            0
        ), 
        0
    ) AS input_need_amount,
    own.id as input_inventory_id,
    output.game_id AS game_id,
    r.id AS recipe_id
FROM plans p
JOIN items output ON p.item_id = output.id
JOIN recipes r ON output.id = r.item_id
JOIN recipe_details rd ON r.id = rd.recipe_id
JOIN items input ON rd.item_id = input.id
left JOIN inventories own ON input.id = own.item_id;