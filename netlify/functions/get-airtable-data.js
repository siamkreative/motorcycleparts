const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AT_API_KEY }).base(process.env.AT_BASE)

exports.handler = function (event, context, callback) {
  const allRecords = []
  base(process.env.AT_TABLE)
    .select({
      maxRecords: 100,
      view: 'Grid view'
    })
    .eachPage(
      function page (records, fetchNextPage) {
        records.forEach(function (record) {
          allRecords.push(record._rawJson)
        })
        fetchNextPage()
      },
      function done (err) {
        if (err) {
          callback(err)
        } else {
          const body = JSON.stringify({ records: allRecords })
          const response = {
            statusCode: 200,
            body: body,
            headers: {
              'content-type': 'application/json',
              'cache-control': 'Cache-Control: max-age=300, public'
            }
          }
          callback(null, response)
        }
      }
    )
}
