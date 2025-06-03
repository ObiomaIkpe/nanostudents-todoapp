const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0', // Specify the OpenAPI version
  info: {
    title: 'My TODO API',
    version: '1.0.0',
    description: 'An API for Nanocodes todo app.',
  },
  servers: [
    {
      url: 'http://127.0.0.1:3000', // Base URL for the API
      description: 'Development server',
    },
    {
      url: 'www.google.com', // Base URL for the API
      description: 'Google server',
    },
  ],
}

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './index.js'], // Path to the API docs
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

