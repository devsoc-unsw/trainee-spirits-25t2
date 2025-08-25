const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Memo API",
      version: "1.0.0",
      description: "API documentation for Travel Memo project",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./app.js", "./models/*.js"],
};

module.exports = swaggerJsdoc(options);
