# Imagen base MySQL 8 oficial
FROM mysql:8.0

# Copiar script de inicialización
# Se ejecuta automáticamente la primera vez que el volumen esté vacío
COPY init.sql /docker-entrypoint-initdb.d/

# Exponer el puerto interno de MySQL
EXPOSE 3306