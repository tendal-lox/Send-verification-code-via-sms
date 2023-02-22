'use strict'

const {test} = require('tap')
const {build} = require('../helper')
const supertest = require('supertest')
const {validateGivenPhoneNumber} = require('../../controller/phoneNumber')

test('check given phone number', async (t) => {
    // Arrange
    const app = await build(t)

    // Act
    const res = await supertest(app.server).post('/sendcode')
    .send({
        phoneNumber: 'phoneNumber'
    })

    // Assert
    // t.ok(res.body.phoneNumber)
    t.equal(res.statusCode, 200)
})

test('missing phone number', async (t) => {
    // Arrange
    const app = await build(t)

    const res = await app.inject({
        method: 'post',
        url: '/sendcode'
    })

    // Assert
    t.equal(res.statusCode, 400)
})

test('should return false when phone number contains letter', async (t) => {
    // Act
    const givenPhoneNumber = await validateGivenPhoneNumber('hello123')

    // Assert
    t.equal(givenPhoneNumber, false)
})

test('should return true when phone number length is equal to 11', async (t) => {
    // Act
    const givenPhoneNumber = await validateGivenPhoneNumber('09195589875')

    // Assert
    t.equal(givenPhoneNumber, true)
})