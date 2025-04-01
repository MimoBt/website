CREATE DATABASE IF NOT EXISTS plumbing_db;
USE plumbing_db;

CREATE TABLE IF NOT EXISTS contact_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new'
);

CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insérer quelques services par défaut
INSERT INTO services (title, description, icon) VALUES
('Plomberie Générale', 'Services de plomberie complets pour votre maison', 'fa-wrench'),
('Chauffage', 'Installation et maintenance de systèmes de chauffage', 'fa-fire'),

(gAs engineer, boiler repAir,leAking boiler);
('Services d''Urgence', 'Intervention rapide 24/7', 'fa-ambulance'); 