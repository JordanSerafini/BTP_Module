DO $$
DECLARE
    existing_companies INT;
BEGIN
    -- Vérifier si la table company contient déjà des données
    SELECT COUNT(*) INTO existing_companies FROM company;

    IF existing_companies = 0 THEN
        -- Insérer quelques données de base

        -- Adresses
        INSERT INTO address (street, city, state, country, postal_code, latitude, longitude)
        VALUES 
        ('123 Main St', 'Barcelona', 'Catalonia', 'Spain', '08001', 41.3851, 2.1734),
        ('45 Warehouse Rd', 'Valencia', 'Valencia', 'Spain', '46001', 39.4702, -0.3768),
        ('78 Company Ave', 'Seville', 'Andalusia', 'Spain', '41001', 37.3891, -5.9845);

        -- Entreprise
        INSERT INTO company (name, email, phone, address_id)
        VALUES ('TransLogix', 'contact@translogix.com', '+34 600000001', 1);

        -- Clients
        INSERT INTO customer (company_id, name, email, phone, address_id)
        VALUES 
        (1, 'Customer A', 'customerA@example.com', '+34 600000002', 2),
        (1, 'Customer B', 'customerB@example.com', '+34 600000003', 3);

        -- Entrepôts
        INSERT INTO warehouse (company_id, name, address_id, capacity)
        VALUES 
        (1, 'Barcelona Warehouse', 2, 1000),
        (1, 'Valencia Warehouse', 3, 800);

        -- Camions
        INSERT INTO truck (company_id, license_plate, capacity, model)
        VALUES 
        (1, 'B-1234-ABC', 400, 'Iveco 80E18'),
        (1, 'V-5678-XYZ', 300, 'Iveco 80E21');

        -- Chauffeurs
        INSERT INTO driver (company_id, name, license_number, phone)
        VALUES
        (1, 'John Doe', 'LIC12345', '+34 600000004'),
        (1, 'Jane Smith', 'LIC67890', '+34 600000005');

        -- Produits
        INSERT INTO product (company_id, name, weight)
        VALUES
        (1, 'Electronics', 5),
        (1, 'Clothing Box', 2);

        -- Statuts de commande
        INSERT INTO order_status (code, label)
        VALUES ('PENDING', 'Pending'),
               ('SHIPPED', 'Shipped'),
               ('DELIVERED', 'Delivered');

        -- Statuts de shipment
        INSERT INTO shipment_status (code, label)
        VALUES ('LOADING', 'Loading'),
               ('IN_TRANSIT', 'In Transit'),
               ('COMPLETED', 'Completed');

        -- Commandes
        INSERT INTO "order" (company_id, customer_id, warehouse_id, total_weight, status_id)
        VALUES (1, 1, 1, 100, 1),  
               (1, 2, 1, 200, 1);

        -- Items de commande
        INSERT INTO order_item (order_id, product_id, quantity, unit_weight)
        VALUES 
        (1, 1, 10, 5),  
        (1, 2, 25, 2), 
        (2, 1, 20, 5);  

        -- Routes
        INSERT INTO route (company_id, name, start_warehouse_id, end_warehouse_id)
        VALUES 
        (1, 'Barcelona – Seville', 1, NULL),
        (1, 'Barcelona – Valencia', 1, 2);

        -- Arrêts (Route stops)
        INSERT INTO route_stop (route_id, warehouse_id, stop_order, arrival_eta, departure_eta)
        VALUES 
        (1, 1, 1, '2024-06-15 08:00:00', '2024-06-15 08:30:00'),
        (2, 2, 1, '2024-06-15 14:00:00', '2024-06-15 14:30:00');

        -- Shipments
        INSERT INTO shipment (order_id, truck_id, driver_id, route_id, status_id)
        VALUES 
        (1, 1, 1, 1, 1),  
        (2, 2, 2, 2, 1);  

        RAISE NOTICE 'Database seeded successfully.';

    ELSE
        RAISE NOTICE 'Seeding skipped: data already present.';
    END IF;
END
$$;
