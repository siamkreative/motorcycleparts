export const handler = async () => {
  const { AT_API_KEY, AT_BASE, AT_TABLE } = process.env
  const url = `https://api.airtable.com/v0/${AT_BASE}/${encodeURIComponent(AT_TABLE)}?maxRecords=100&view=Grid+view`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AT_API_KEY}` }
  })

  if (!res.ok) {
    return { statusCode: res.status, body: 'Airtable request failed' }
  }

  return {
    statusCode: 200,
    body: await res.text(),
    headers: {
      'content-type': 'application/json',
      'cache-control': 'max-age=300, public'
    }
  }
}
