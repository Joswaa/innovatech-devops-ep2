# InnovaTech Chile - EP2 DevOps

Proyecto - Introducción a Herramientas DevOps.

## Descripción
La solución está dividida en tres capas:
- Frontend
- Backend
- Base de datos MySQL

El proyecto utiliza:
- Docker
- Docker Compose
- AWS EC2
- Amazon ECR
- GitHub Actions
- AWS Systems Manager (SSM)

## Estructura del proyecto
- `frontend/`: interfaz web servida con Nginx
- `backend/`: API REST en Node.js + Express
- `db/`: imagen de MySQL con script de inicialización
- `docker-compose.yml`: orquestación local del stack
- `.github/workflows/`: despliegue automatizado de frontend y backend

## Ejecución local
```bash
docker compose up --build
```

## Puertos
- Frontend: 80
- Backend: 3001
- MySQL: 3306

## Persistencia
La base de datos usa un volumen Docker nombrado para conservar los datos.

## Despliegue
- Frontend y Backend se despliegan mediante GitHub Actions
- Base de datos se despliega manualmente en su EC2 correspondiente

## Integrantes
- Nombre 1
- Nombre 2
