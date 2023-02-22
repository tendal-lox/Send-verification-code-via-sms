'use strict'

module.exports.sendCodeShcema = {
    schema: {
        body: {
          type: 'object',
          properties: {
            phoneNumber: {type: 'string'},
          }
        }
      }
}

module.exports.verifyCodeShcema = {
  schema: {
      body: {
        type: 'object',
        properties: {
          phoneNumber: {type: 'string'},
          code: {type: 'string'}
        }
      }
    }
}