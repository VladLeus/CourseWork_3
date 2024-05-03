import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1714729250699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
        CREATE TABLE categories
        (
            id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name                  VARCHAR(255),
            provider              VARCHAR(255),
            provider_phone_number VARCHAR(20)
        );
    `);

    await queryRunner.query(`
        CREATE TABLE car_parts
        (
            id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            category_id   UUID REFERENCES categories (id),
            name          VARCHAR(255),
            description   TEXT,
            image         BYTEA,
            price_per_one NUMERIC
        );
    `);

    await queryRunner.query(`
        CREATE TABLE car_model
        (
            id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name  VARCHAR(255),
            brand VARCHAR(255)     DEFAULT 'Audi'
        );
    `);

    await queryRunner.query(`
            CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'CLIENT');
        `);

    await queryRunner.query(`
        CREATE TABLE users
        (
            id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name   VARCHAR(100),
            last_name    VARCHAR(100),
            email        VARCHAR(255),
            password     VARCHAR(255),
            car_model_id UUID REFERENCES car_model (id),
            user_role    user_role_enum
        );
    `);

    await queryRunner.query(`
        CREATE TABLE order_details
        (
            id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            parts_bought JSONB,
            total_price  NUMERIC,
            order_date   TIMESTAMP
        );
    `);

    await queryRunner.query(`
        CREATE TABLE orders
        (
            id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id          UUID REFERENCES users (id),
            order_details_id UUID REFERENCES order_details (id)
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
