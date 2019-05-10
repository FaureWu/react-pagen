const fs = require('fs')
const path = require('path')
const express = require('express')

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const router = express.Router()

const read = (dir, filter = () => true) =>
  fs.readdirSync(dir)
    .reduce(
      (files, file) =>
        fs.statSync(path.join(dir, file)).isDirectory()
          ? files.concat(read(path.join(dir, file)))
          : files.concat(path.join(dir, file)),
      [],
    )
    .filter(filter)

const mocks = read(
  `${__dirname}/../../mock`,
  file => path.extname(file) === '.js',
).reduce(
  (mock, file) => ({
    ...mock,
    ...require(file),
  }),
  {},
)

const validMethods = ['GET', 'POST', 'PUT', 'DELETE']

Object.keys(mocks).forEach(route => {
  const [method, url] = route.split(' ')

  if (validMethods.indexOf(method) !== -1 && url) {
    router[method.toLocaleLowerCase()](url, (req, res, next) =>
      delay(200).then(() => {
        const handler = mocks[route]

        if (typeof handler === 'object') {
          res.status(200).json(handler)
        } else if (typeof handler === 'function') {
          const result = handler(req, res, next)
          if (typeof result === 'object' && !result.hasOwnProperty('statusCode')) {
            res.status(200).json(result)
          }
        }
      }),
    )
  } else {
    throw Error(`invalid request [${route}]`)
  }
})

module.exports = router
