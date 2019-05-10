const concurrently = require('concurrently')

const params = process.argv.slice(2)

const devCommand = params.reduce((command, param) => `${command} ${param}`, 'cross-env node ./scripts/dev.js')

concurrently([
  { command: devCommand, name: 'dev' },
  { command: 'nodemon --watch ./mock --watch ./server ./server/bin/www', name: 'server' }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 0,
})
