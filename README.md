# User-API

Una API RESTful construida con NestJS para gestionar usuarios y autenticación mediante JWT.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Ejemplo de Solicitudes](#ejemplo-de-solicitudes)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- Registro de usuarios
- Inicio de sesión
- Autenticación de usuarios mediante JWT
- Manejo de sesiones mediante cookies
- CRUD completo para usuarios
- Documentación de la API con Swagger
- Emisión de mensajes por Socket.IO
- Logging


## Tecnologías Utilizadas

- **[NestJS](https://nestjs.com/)**: Un framework progresivo para construir aplicaciones del lado del servidor eficientes y escalables en Node.js. Utiliza TypeScript y ofrece una arquitectura modular que facilita la organización y el mantenimiento del código.
  
- **[MongoDB](https://www.mongodb.com/)**: Una base de datos NoSQL orientada a documentos que permite almacenar datos en un formato flexible, similar a JSON. Ideal para aplicaciones modernas que requieren escalabilidad y alto rendimiento.
  
- **[Mongoose](https://mongoosejs.com/)**: Una biblioteca de modelado de objetos MongoDB para Node.js. Proporciona una solución basada en esquemas para modelar los datos de la aplicación, incluyendo validación, casting y lógica empresarial.

- **[Passport.js](http://www.passportjs.org/)**: Un middleware de autenticación para Node.js que proporciona una forma simple y extensible de implementar autenticación en aplicaciones web.

- **[JWT (JSON Web Tokens)](https://jwt.io/)**: Un estándar abierto (RFC 7519) que define un método compacto y autónomo para transmitir información segura entre partes como un objeto JSON. Se utiliza comúnmente para la autenticación.

- **[Express](https://expressjs.com/)**: Un framework web minimalista para Node.js que proporciona un conjunto robusto de características para desarrollar aplicaciones web y móviles.

- **[Swagger](https://swagger.io/)**: Una herramienta que permite documentar APIs RESTful. Facilita la interacción con la API a través de una interfaz gráfica donde los desarrolladores pueden probar los endpoints.

- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Una biblioteca para encriptar contraseñas utilizando el algoritmo bcrypt, proporcionando una forma segura de almacenar contraseñas.

- **[class-validator](https://github.com/typestack/class-validator)**: Un paquete que permite validar objetos utilizando decoradores, facilitando la validación de datos en aplicaciones NestJS.

- **[class-transformer](https://github.com/typestack/class-transformer)**: Permite transformar objetos simples en instancias de clases y viceversa, lo cual es útil al trabajar con DTOs en NestJS.

- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Middleware para analizar cookies en las solicitudes HTTP, permitiendo el manejo fácil de cookies en Express.

- **[socket.io](https://socket.io/)**: Una biblioteca que permite la comunicación bidireccional en tiempo real entre clientes y servidores.

- **[winston](https://github.com/winstonjs/winston)**: Un logger versátil para Node.js que permite registrar información en diferentes niveles y formatos, ideal para el monitoreo y la depuración.

- **[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)**: Middleware para servir la interfaz de usuario Swagger a través de Express, facilitando la visualización y prueba de tu API.

### Dependencias

A continuación se muestra un resumen de las dependencias clave utilizadas en este proyecto:

```json
"dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/mongoose": "^10.1.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.0.0",
    "mongoose": "^8.8.3",
    "passport": "^0.7.0",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "cookie-parser": "^1.4.7",
    "swagger-ui-express": "^5.0.1",
    "winston": "^3.17.0"
}

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/carlapvalera/user-api.git
   cd user-api

2. Construir la Imagen Docker

  ```bash
  docker build -t my-nestjs-api .
  docker run -d --name my-nestjs-container -p 3000:3000 my-nestjs-api


## Uso

  - La API estará disponible en http://localhost:3000.
  - Accede a la documentación Swagger en http://localhost:3000/api-docs.

## Endpoints de la API

### Usuarios
  - Registrar un Usuario
      Método: POST
      URL: /users/register
      Body:
      json
      {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password123"
      }

  - Iniciar Sesión
      Método: POST
      URL: /auth/login
      Body:
      json
      {
        "email": "testuser@example.com",
        "password": "password123"
      }

  - Obtener Todos los Usuarios
      Método: GET
      URL: /users
      Autenticación: Requiere JWT en cookies.
  - Obtener un Usuario por ID
      Método: GET
      URL: /users/:id

  - Autenticación: Requiere JWT en cookies.

  - Actualizar un Usuario
      Método: PUT
      URL: /users/:id
      Body:
      json
      {
        "username": "updateduser"
      }

  - Eliminar un Usuario
      Método: DELETE
      URL: /users/:id

