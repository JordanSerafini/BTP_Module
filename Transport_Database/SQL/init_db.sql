BEGIN;

-- Table des adresses
CREATE TABLE IF NOT EXISTS address (
  id SERIAL PRIMARY KEY,
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Entreprise (tenant)
CREATE TABLE IF NOT EXISTS company (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  address_id INT REFERENCES address(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Clients
CREATE TABLE IF NOT EXISTS customer (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES company(id) ON DELETE CASCADE,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  address_id INT REFERENCES address(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Entrepôts
CREATE TABLE IF NOT EXISTS warehouse (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES company(id) ON DELETE CASCADE,
  name VARCHAR(100),
  address_id INT REFERENCES address(id) ON DELETE SET NULL,
  capacity INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Camions
CREATE TABLE IF NOT EXISTS truck (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES company(id) ON DELETE CASCADE,
  license_plate VARCHAR(20) UNIQUE,
  capacity INT,
  model VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chauffeurs
CREATE TABLE IF NOT EXISTS driver (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES company(id) ON DELETE CASCADE,
  name VARCHAR(100),
  license_number VARCHAR(50),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Produits
CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES company(id) ON DELETE CASCADE,
  name VARCHAR(100),
  weight INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tables de statuts
CREATE TABLE IF NOT EXISTS order_status (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  label VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS shipment_status (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  label VARCHAR(100)
);

-- Commandes
CREATE TABLE IF NOT EXISTS "order" (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES company(id) ON DELETE CASCADE,
  customer_id INT REFERENCES customer(id) ON DELETE SET NULL,
  warehouse_id INT REFERENCES warehouse(id) ON DELETE SET NULL,
  total_weight INT,
  status_id INT REFERENCES order_status(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Détails de commande
CREATE TABLE IF NOT EXISTS order_item (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES "order"(id) ON DELETE CASCADE,
  product_id INT REFERENCES product(id) ON DELETE SET NULL,
  quantity INT,
  unit_weight INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Routes (itinéraires)
CREATE TABLE IF NOT EXISTS route (
  id SERIAL PRIMARY KEY,
  company_id INT REFERENCES company(id) ON DELETE CASCADE,
  name VARCHAR(100),
  start_warehouse_id INT REFERENCES warehouse(id) ON DELETE SET NULL,
  end_warehouse_id INT REFERENCES warehouse(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Étapes intermédiaires (arrêts)
CREATE TABLE IF NOT EXISTS route_stop (
  id SERIAL PRIMARY KEY,
  route_id INT REFERENCES route(id) ON DELETE CASCADE,
  warehouse_id INT REFERENCES warehouse(id) ON DELETE SET NULL,
  stop_order INT,
  arrival_eta TIMESTAMP,
  departure_eta TIMESTAMP
);

-- Expéditions
CREATE TABLE IF NOT EXISTS shipment (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES "order"(id) ON DELETE CASCADE,
  truck_id INT REFERENCES truck(id) ON DELETE SET NULL,
  driver_id INT REFERENCES driver(id) ON DELETE SET NULL,
  route_id INT REFERENCES route(id) ON DELETE SET NULL,
  status_id INT REFERENCES shipment_status(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);


COMMIT;