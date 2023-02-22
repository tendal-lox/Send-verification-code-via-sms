'use strict'

const {signUp} = require('../schema/authSchema')

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        return 'hello welcome to your page'
    })
}