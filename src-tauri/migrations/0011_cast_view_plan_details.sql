DROP VIEW v_plan_details;

CREATE VIEW IF NOT EXISTS
v_plan_details AS
SELECT
	p.id id,
	p.goal goal,
	input.id input_item_id,
	input.name input_item_name,
	input.picture input_item_picture,
    CAST(COALESCE((p.goal/r.output_amount)*rd.input_amount + 1, 0) AS INTEGER) required_amount,
	output.id output_item_id,
	output.name output_item_name,
	output.picture output_item_picture,
	own.amount input_amount_owned,
	CAST(COALESCE(MAX(((p.goal/r.output_amount)*rd.input_amount + 1) - own.amount, 0), 0) AS INTEGER) input_need_amount,
    output.game_id game_id
from plans p 
join items output on p.item_id = output.id 
join recipes r on output.id = r.item_id 
join recipe_details rd on r.id = rd.recipe_id
join items input on rd.item_id = input.id
join inventories own on input.id = own.item_id;