'use strict'

module.exports.signUp = {
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {type: 'string'},
                password: {type: 'string'}
            }
        }
    }
}