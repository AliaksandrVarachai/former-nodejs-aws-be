insert into products (title, description, price)
values
    ('Product1', 'Description 1', 35),
    ('Product2', 'Description 2', 42),
    ('Product3', 'Description 3', 29)
;

values
    ((select product_id from products where title = 'Product1'), 15),
    ((select product_id from products where title = 'Product1'), 3),
    ((select product_id from products where title = 'Product2'), 11),
    ((select product_id from products where title = 'Product2'), 27),
    ((select product_id from products where title = 'Product2'), 99),
    ((select product_id from products where title = 'Product3'), 13)
;
