'use strict'

const { build: buildApplication } = require('fastify-cli/helper')
const path = require('path')
const AppPath = path.join(__dirname, '..', 'app.js')

// Fill in this config with all the configurations
// needed for testing the application
function config () {
  return {}
}

async function build (t) {
  const argv = [AppPath]
  
  const app = await buildApplication(argv, config())

  t.teardown(app.close.bind(app))

  return app
}

module.exports = {
  config,
  build
}
