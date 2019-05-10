const faker = require('faker')

function getInfo(req, res) {
  res.status(200).json({
    code: 'success',
    message: '',
    data: {
      name: faker.name.findName(),
      age: faker.random.number({ min: 1, max: 100 }),
    },
  })
}

module.exports = {
  'GET /demo/info': getInfo,
}
