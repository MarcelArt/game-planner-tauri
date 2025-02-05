DROP VIEW v_plan_details;

CREATE VIEW IF NOT EXISTS
v_plan_details AS
SELECT
	p.id id,
	p.goal goal,
	output.name output_item_name,
	input.id input_item_id,
	input.name input_item_name,
	input.picture input_item_picture,
    (COALESCE(CEIL((CAST(p.goal as real)/r.output_amount)*rd.input_amount), 0) ) required_amount,
	output.id output_item_id,
	output.picture output_item_picture,
	own.amount input_amount_owned,
	(COALESCE(MAX(CEIL((CAST(p.goal as real)/r.output_amount)*rd.input_amount) - own.amount, 0), 0) ) input_need_amount,
    output.game_id game_id,
    r.id recipe_id
from plans p 
join items output on p.item_id = output.id 
join recipes r on output.id = r.item_id 
join recipe_details rd on r.id = rd.recipe_id
join items input on rd.item_id = input.id
join inventories own on input.id = own.item_id;