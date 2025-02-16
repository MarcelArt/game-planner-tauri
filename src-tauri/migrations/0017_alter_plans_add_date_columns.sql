DROP VIEW v_plan_details;

CREATE TABLE plans_new (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    item_id VARCHAR(255) NOT NULL,
    goal INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (item_id) REFERENCES items(id)
);

-- Step 2: Copy existing data into the new table
INSERT INTO plans_new (id, item_id, goal, created_at, updated_at, deleted_at)
SELECT id, item_id, goal, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL FROM plans;

-- Step 3: Drop the old table
DROP TABLE plans;

-- Step 4: Rename the new table to match the original name
ALTER TABLE plans_new RENAME TO plans;

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