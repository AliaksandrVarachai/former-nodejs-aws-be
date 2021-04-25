-- drop table lesson4;
create database lesson4;

create extension if not exists "uuid-ossp";

-- drop table products;
create table products (
    product_id uuid primary key default uuid_generate_v4(),
    title varchar(100) not null unique,
    description varchar(255),
    -- TODO: replace with a money type
    price int4 check (price >= 0),
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

-- drop table stocks
create table stocks (
    stock_id uuid primary key default uuid_generate_v4(),
    product_id uuid references products (product_id) on delete cascade,
    count int4 check ("count" >= 0),
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

-- DROP FUNCTION IF EXISTS public.trigger_set_timestamp
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp() RETURNS trigger
LANGUAGE plpgsql
AS $function$
    begin
        NEW.updated_at = NOW();
        return NEW;
    end;
$function$;

-- DROP TRIGGER set_timestamp_users ON public.products;
CREATE trigger set_timestamp_products
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE function trigger_set_timestamp();

-- DROP TRIGGER set_timestamp_groups ON public.stocks;
CREATE trigger set_timestamp_stocks
BEFORE UPDATE ON stocks
FOR EACH ROW EXECUTE function trigger_set_timestamp();
