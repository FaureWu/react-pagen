const fs = require('fs')
const path = require('path')

function createHump(words = []) {
  return words.reduce((result, word, index) => {
    if (index === 0) return word

    const c = word.charAt(0).toUpperCase()
    return `${result}${c}${word.slice(1)}`
  }, '')
}

function checkFilesExsit(arr) {
  return arr.every(file => fs.existsSync(file))
}

function readPage(name, dir, nodes, document) {
  if (!fs.statSync(dir).isDirectory()) return

  const entryPath = path.join(dir, 'index.js')
  if (!fs.existsSync(entryPath)) return

  const localDoc = path.join(dir, 'index.html')
  const doc = fs.existsSync(localDoc) ? localDoc : document

  if (!checkFilesExsit([doc, entryPath])) return

  return {
    name: createHump(nodes.concat([name])),
    entry: entryPath,
    document: doc,
  }
}

function readPageDir({ pageDir, srcDir, nodes, regExp, document }, pages) {
  return fs.readdirSync(pageDir).reduce((result, file) => {
    const currentPath = path.join(pageDir, file)
    const isDir = fs.statSync(currentPath).isDirectory()
    if (isDir) {
      if (regExp.test(currentPath)) {
        const page = readPage(file, currentPath, nodes, document)
        if (page) result.push(page)
      }
      return readPageDir({ pageDir: currentPath, nodes: nodes.concat([file]), srcDir, regExp, document }, result)
    }
    return result
  }, pages)
}

function readPages(match = '') {
  const pageDir = path.resolve(__dirname, '../src/pages')
  const srcDir = path.resolve(__dirname, '../src')
  const document = path.join(srcDir, 'index.html')

  return readPageDir({ pageDir, nodes: [], srcDir, regExp: new RegExp(match), document }, [])
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

function parseParams() {
  const params = process.argv.slice(2)
  return params.reduce((result, item) => {
    const [k, v] = item.split('=')
    return {
      ...result,
      [k]: v,
    }
  }, {})
}

module.exports = {
  readPages,
  getPagesEntry,
  parseParams,
}
