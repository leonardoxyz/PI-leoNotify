const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'leoBlog - API',
            version: '1.0.0',
            description: 'API made for leoBlog, a blog website made with React and Node.js'
        },
        servers: [
            {
                url: 'http://localhost:5510',
                description: 'leoBlog - Development Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [path.resolve(__dirname, './controllers/*.js')]
};

const specs = swaggerJsdoc(options);

module.exports = app => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
