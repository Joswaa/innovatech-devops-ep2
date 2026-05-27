CREATE DATABASE IF NOT EXISTS tienda_perritos;
USE tienda_perritos;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
);

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Alimento Premium Cachorro', 'Alimento balanceado para cachorros de razas pequeñas y medianas.', 15990.00, 25),
('Snack Dental', 'Snack para higiene bucal y cuidado de dientes.', 4990.00, 40),
('Croquetas Adulto', 'Croquetas para perros adultos con alta digestibilidad.', 18990.00, 18),
('Paté Nutritivo', 'Paté húmedo con vitaminas y minerales esenciales.', 2990.00, 60);
