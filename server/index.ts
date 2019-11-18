const express: any = require('express')
const consola: any = require('consola')

const { Nuxt, Builder } = require('nuxt')

const app: any = express()

// Import and Set Nuxt.js options
const config: any = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV === 'development'

async function start() {
  // Init Nuxt.js
  const nuxt: any = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder: any = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
