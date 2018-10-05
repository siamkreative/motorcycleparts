require('dotenv').config()
const browserSync = require('browser-sync')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()
const port = 3000
const isProduction = 'production' === process.env.NODE_ENV;

/**
 * Airtable Parameters
 * https://airtable.com/app4IWHES22hgCP4L/api/docs#curl/introduction
 */
const key = process.env.AT_API_KEY
const base = process.env.AT_BASE
const table = process.env.AT_TABLE
const endpoint = `https://api.airtable.com/v0/${base}/${table}?maxRecords=20`

app.get('/get', bodyParser.json(), async (req, res) => {
    var resp = await fetch(endpoint, {
        headers: {
            "Authorization": "Bearer " + key
        }
    })
    const json = await resp.json()
    res.json(json.records)
})

app.use('/', express.static('public'))

app.listen(process.env.PORT || port, listening);

function listening() {
	console.log(`App listening on port ${port}!`)
	if (!isProduction) {
		browserSync({
			files: ['public/**/*.{html,js,css}'],
			online: false,
			open: false,
			port: port + 1,
			proxy: 'localhost:' + port,
			ui: false
		})
	}
}
