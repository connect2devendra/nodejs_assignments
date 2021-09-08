const express = require('express');
require('dotenv').config({path:'.env-local'});
const userRoute = require('./routes/user-route');
const cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Assignments - NodeJs Rest API with JWT Auth",
      version: "1.0.0",
      description: "This is a simple Auth System API application made with Express and documented with Swagger",
      contact: {
        name: "Devendra",
        url: "https://connect2devendra.com",
        email: "connect2devendra@outlook.com",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      }      
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: 'Testing server',
      }
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
    //   security: [
    //     {
    //       bearerAuth: [],
    //     },
    //   ],
  },
  swagger: '2.0',
  basePath: '/v1',
  schemes: ['http','https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  apis: [`${__dirname}/routes/user-route.js`]
};

const app = express();

//swagger configuration options
const swaggerSpec = swaggerJSDoc(swaggerOptions);
// console.log(swaggerSpec);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


/**
 * Middleware
 */

app.use(express.json());
// app.use(express.urlencoded({extended:false}));

//cors issues handle
app.use(cors());

/**
 * Routes
 */

app.use("/api/v1/users", userRoute);

// app.get('*', function (req, res) {

//     res.status(400).json({
//         status: false,
//         message: "Invalid route endpoints!"
//     });
// });

// app.post('*', function (req, res) {

//     res.status(400).json({
//         status: false,
//         message: "Invalid route endpoints!"
//     });
// });

module.exports = app;
