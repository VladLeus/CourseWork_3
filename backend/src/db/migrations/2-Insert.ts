import { MigrationInterface, QueryRunner } from 'typeorm';

export class Insert1714729697095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserting category

    await queryRunner.query(`
        INSERT INTO category (id, name, provider, provider_phone_number)
        VALUES (uuid_generate_v4(), 'Wheels', 'Provider A', '123-456-789'),
               (uuid_generate_v4(), 'Lights', 'Provider B', '987-654-321'),
               (uuid_generate_v4(), 'Windscreen', 'Provider C', '456-789-123'),
               (uuid_generate_v4(), 'Engine Parts', 'Provider D', '111-222-333'),
               (uuid_generate_v4(), 'Braking System', 'Provider E', '444-555-666'),
               (uuid_generate_v4(), 'Suspension System', 'Provider F', '777-888-999'),
               (uuid_generate_v4(), 'Exhaust System', 'Provider G', '000-999-888'),
               (uuid_generate_v4(), 'Interior Accessories', 'Provider H', '123-456-789'),
               (uuid_generate_v4(), 'Exterior Accessories', 'Provider I', '987-654-321'),
               (uuid_generate_v4(), 'Electrical Components', 'Provider J', '111-222-333'),
               (uuid_generate_v4(), 'Cooling System', 'Provider K', '444-555-666'),
               (uuid_generate_v4(), 'Transmission Parts', 'Provider L', '777-888-999'),
               (uuid_generate_v4(), 'Body Panels', 'Provider M', '000-999-888'),
               (uuid_generate_v4(), 'Interior Trim', 'Provider N', '123-456-789'),
               (uuid_generate_v4(), 'Exterior Trim', 'Provider O', '987-654-321'),
               (uuid_generate_v4(), 'Filters', 'Provider P', '555-666-777'),
               (uuid_generate_v4(), 'Fluids and Lubricants', 'Provider Q', '888-999-000');
    `);

    // Inserting car models
    await queryRunner.query(`
        INSERT INTO car_model (id, name, brand)
        VALUES (uuid_generate_v4(), 'RS3', 'Audi'),
               (uuid_generate_v4(), 'RS4', 'Audi'),
               (uuid_generate_v4(), 'RS5', 'Audi'),
               (uuid_generate_v4(), 'RS6', 'Audi'),
               (uuid_generate_v4(), 'RS7', 'Audi'),
               (uuid_generate_v4(), 'RS Q3', 'Audi'),
               (uuid_generate_v4(), 'RS Q8', 'Audi');
    `);

    // Inserting car parts
    await queryRunner.query(`
      -- For Wheels category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Wheels'), 'Standard Alloy Wheels', 'Durable alloy wheels for everyday use', 200),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Wheels'), 'Premium Carbon Fiber Wheels', 'Lightweight and high-performance carbon fiber wheels', 800);

      -- For Lights category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Lights'), 'Standard LED Headlights', 'Reliable LED headlights with standard brightness', 150),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Lights'), 'Advanced Xenon Headlights', 'Powerful xenon headlights with enhanced brightness', 400);

      -- For Windscreen category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Windscreen'), 'Standard Windscreen', 'High-quality standard windscreen for optimal visibility', 100),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Windscreen'), 'Premium Tinted Windscreen', 'Tinted windscreen with UV protection and enhanced aesthetics', 250);

      -- For Engine Parts category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Engine Parts'), 'Standard Air Filter', 'Quality air filter for engine performance optimization', 50),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Engine Parts'), 'High-Performance Exhaust System', 'Custom exhaust system for increased engine power and sound', 1000);

      -- For Braking System category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Braking System'), 'Standard Brake Pads', 'Reliable brake pads for everyday driving', 80),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Braking System'), 'Performance Brake Kit', 'Upgraded brake kit for improved stopping power and durability', 500);

      -- For Suspension System category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Suspension System'), 'Standard Coil Springs', 'Coil springs for comfortable and stable ride', 150),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Suspension System'), 'Adjustable Coilovers', 'Adjustable coilovers for customizable suspension setup', 1000);

      -- For Exhaust System category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Exhaust System'), 'Mild Steel Exhaust', 'Durable exhaust system with standard performance', 300),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Exhaust System'), 'Stainless Steel Performance Exhaust', 'High-performance exhaust system with enhanced sound and power', 800);

      -- For Interior Accessories category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Interior Accessories'), 'Seat Covers', 'Protective seat covers for comfort and style', 50),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Interior Accessories'), 'Dashboard Camera', 'Dash cam for recording driving footage and enhancing safety', 200);

      -- For Exterior Accessories category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Exterior Accessories'), 'Roof Rack', 'Versatile roof rack for carrying gear and equipment', 300),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Exterior Accessories'), 'Body Kit', 'Custom body kit for enhancing vehicle aesthetics and aerodynamics', 1000);

      -- For Electrical Components category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Electrical Components'), 'Standard Car Battery', 'Reliable car battery for starting and powering electrical systems', 100),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Electrical Components'), 'High-Performance Alternator', 'Powerful alternator for increased electrical output and reliability', 500);

      -- For Cooling System category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Cooling System'), 'Radiator', 'Efficient radiator for engine cooling', 200),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Cooling System'), 'Electric Cooling Fan', 'Electric cooling fan for improved temperature regulation', 150);

      -- For Transmission Parts category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Transmission Parts'), 'Transmission Filter Kit', 'Transmission filter kit for maintaining smooth shifting', 50),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Transmission Parts'), 'Performance Clutch Kit', 'Upgraded clutch kit for enhanced performance and durability', 800);

      -- For Body Panels category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Body Panels'), 'Fender', 'Replacement fender for damaged or worn-out panels', 150),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Body Panels'), 'Carbon Fiber Hood', 'Lightweight carbon fiber hood for improved aesthetics and weight reduction', 1000);

      -- For Interior Trim category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Interior Trim'), 'Wood Grain Dashboard Trim', 'Wood grain dashboard trim for luxurious interior styling', 200),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Interior Trim'), 'Aluminum Pedal Covers', 'Aluminum pedal covers for sporty interior look and feel', 100);

      -- For Exterior Trim category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Exterior Trim'), 'Chrome Door Handle Covers', 'Chrome door handle covers for stylish exterior accents', 50),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Exterior Trim'), 'Carbon Fiber Mirror Caps', 'Carbon fiber mirror caps for sleek and modern exterior look', 150);

      -- For Filters category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Filters'), 'Air Filter', 'Air filter for engine air intake filtration', 20),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Filters'), 'Oil Filter', 'Oil filter for engine oil filtration', 10);

      -- For Fluids and Lubricants category
      INSERT INTO car_part (id, category_id, name, description, price_per_one)
      VALUES 
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Fluids and Lubricants'), 'Engine Oil', 'Engine oil for lubrication and protection', 30),
        (uuid_generate_v4(), (SELECT id FROM category
         WHERE name = 'Fluids and Lubricants'), 'Brake Fluid', 'Brake fluid for hydraulic brake system operation', 15);
    `);

    // Inserting admin user
    await queryRunner.query(`
        INSERT INTO public.user (id, first_name, last_name, email, password, user_role, car_model_id)
        VALUES (uuid_generate_v4(), 'Admin', 'Admin', 'admin@admin.com', 'admin', 'ADMIN', NULL);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Deleting data from tables in reverse order
    await queryRunner.query(`
        DELETE
        FROM car_part  ;
        DELETE
        FROM category;
        DELETE
        FROM user;
        DELETE
        FROM car_model;
    `);
  }
}
