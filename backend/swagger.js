// backend/swagger.js
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Memo API",
      version: "1.0.0",
      description: "API documentation for Travel Memo project",
    },
    servers: [
      { url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000" },
    ],
  },
  apis: [
    path.join(__dirname, "routes/*.js"),
    path.join(__dirname, "models/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
