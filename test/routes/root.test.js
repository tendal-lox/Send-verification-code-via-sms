'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('default root route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/'
  })

  t.same(res.payload, 'hello welcome to your page')
  t.equal(res.statusCode, 200)
})