require('dotenv').config()
const compression = require('compression')
const express = require('express')
const Bundler = require('parcel-bundler')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const Path = require('path')
const app = express()
const port = 3000
const isProduction = process.env.NODE_ENV === 'production'

// Parcel Bundler config
const entryFiles = Path.join(__dirname, './src/index.html')
const options = {
  outDir: './public'
}
let bundler = new Bundler(entryFiles, options)

// Compress all responses
app.use(compression())

/**
 * Airtable Parameters
 * https://airtable.com/app4IWHES22hgCP4L/api/docs#curl/introduction
 */
const key = process.env.AT_API_KEY
const base = process.env.AT_BASE
const table = process.env.AT_TABLE
const sort = encodeURI('sort[0][field]=Purchase+Date&sort[0][direction]=asc')
const endpoint = `https://api.airtable.com/v0/${base}/${table}?maxRecords=20&${sort}`

app.get('/get', bodyParser.json(), async (req, res) => {
  var resp = await fetch(endpoint, {
    headers: {
      Authorization: 'Bearer ' + key
    }
  })
  const json = await resp.json()
  res.set('Cache-Control', 'public, max-age=604800')
  res.json(json.records)
})

// Use parcel as middleware in development only
isProduction
  ? app.use('/', express.static('public'))
  : app.use(bundler.middleware())

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`))
