alter table recipes
drop column output_amount;
alter table recipes
add column output_amount INTEGER not null DEFAULT 0;

alter table recipe_details
drop column input_amount;
alter table recipe_details
add column input_amount INTEGER not null DEFAULT 0;

alter table inventories
drop column amount;
alter table inventories
add column amount INTEGER not null DEFAULT 0;

alter table plans
drop column goal;
alter table plans
add column goal INTEGER not null DEFAULT 0;