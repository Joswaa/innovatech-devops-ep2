FROM nginx:alpine

# Limpiar contenido por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos estáticos del frontend
COPY index.html app.js /usr/share/nginx/html/

# Copiar configuración personalizada de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
