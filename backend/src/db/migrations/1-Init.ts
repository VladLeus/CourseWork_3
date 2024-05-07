import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1714729250699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
        create table public.car_model
        (
            id    uuid primary key  not null default uuid_generate_v4(),
            name  character varying not null,
            brand character varying not null default 'Audi'
        );
    `);

    await queryRunner.query(`
        create table public.category
        (
            id                    uuid primary key  not null default uuid_generate_v4(),
            name                  character varying not null,
            provider              character varying not null,
            provider_phone_number character varying not null
        );
    `);

    await queryRunner.query(`
        create table public.car_part
        (
            id            uuid primary key  not null default uuid_generate_v4(),
            name          character varying not null,
            description   character varying not null,
            image         bytea,
            price_per_one integer           not null,
            category_id   uuid,
            foreign key (category_id) references public.category (id)
                match simple on update no action on delete cascade
        );
    `);

    await queryRunner.query(`
            create type public.user_user_role_enum as enum ('ADMIN', 'CLIENT');

            alter type public.user_user_role_enum owner to postgres;
        `);

    await queryRunner.query(`
        create table public."user"
        (
            id           uuid default uuid_generate_v4() not null
                constraint "PK_cace4a159ff9f2512dd42373760"
                    primary key,
            first_name   varchar                         not null,
            last_name    varchar                         not null,
            email        varchar                         not null,
            password     varchar                         not null,
            user_role    user_user_role_enum             not null,
            car_model_id uuid
                constraint "FK_2e2c9d4ef641e9432fc444fa7f8"
                    references public.car_model
                    on delete set null
        );

        alter table public."user"
            owner to postgres;
    `);

    await queryRunner.query(`
        create table public.order_detail
        (
            id           uuid primary key            not null default uuid_generate_v4(),
            parts_bought jsonb                       not null,
            total_price  integer                     not null,
            order_date   timestamp without time zone not null
        );
    `);

    await queryRunner.query(`
        create table public."order"
        (
            id               uuid primary key not null default uuid_generate_v4(),
            user_id          uuid,
            order_details_id uuid,
            foreign key (user_id) references public."user" (id)
                match simple on update no action on delete set null,
            foreign key (order_details_id) references public.order_detail (id)
                match simple on update no action on delete set null
        );


    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS order_details;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS car_model;
        DROP TABLE IF EXISTS car_parts;
        DROP TABLE IF EXISTS categories;
        DROP TYPE IF EXISTS user_role_enum;
    `);
  }
}
