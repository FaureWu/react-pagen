const fs = require('fs')
const path = require('path')

function checkFilesExsit(arr) {
  return arr.every(file => fs.existsSync(file))
}

function readPages() {
  const pageDir = path.resolve(__dirname, '../src/pages')

  return fs.readdirSync(pageDir).reduce((files, file) => {
    const config = {}
    const basePath = path.join(pageDir, file)
    const entry = path.join(basePath, 'index.js')
    const document = path.join(basePath, 'index.html')
    if (
      fs.statSync(basePath).isDirectory() &&
      checkFilesExsit([entry, document])
    ) {
      config.name = file
      config.entry = entry
      config.document = document
      files.push(config)
    }

    return files
  }, [])
}

function getPagesEntry(pages) {
  return pages.reduce(
    (entry, config) => ({
      ...entry,
      [config.name]: config.entry,
    }),
    {},
  )
}

module.exports = {
  readPages,
  getPagesEntry,
}
