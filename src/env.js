const env = process.env.BUILD_ENV

const server = {
  local: '/api',
  dev: 'http://dev.server.com',
  sit: 'http://sit.server.com',
  prod: 'http://prod.server.com',
}

const homepage = {
  local: 'http://localhost:8080',
  dev: 'http://devpage.homepage.com',
  sit: 'http://sitpage.homepage.com',
  prod: 'http://prodpage.homepage.com',
}

export default {
  SERVER: server[env],
  HOMEPAGE: homepage[env],
}
