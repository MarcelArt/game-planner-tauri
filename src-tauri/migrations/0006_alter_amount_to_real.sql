alter table recipes
drop column output_amount;
alter table recipes
add column output_amount real not null;

alter table recipe_details
drop column input_amount;
alter table recipe_details
add column input_amount real not null;