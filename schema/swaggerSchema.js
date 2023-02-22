'use strict'

module.exports.swaggerSchema = {
    info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: require('../package.json').version
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'authorization',
          in: 'header'
        }
      },
      security: [
        {
          "apiKey": []
        }
      ]
}

module.exports.swaggerUISchema = {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
}