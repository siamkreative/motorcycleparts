// Select all checkboxes
const checkAll = document.getElementById('checkAll')
checkAll.addEventListener('change', event => {
  const checkboxes = document.querySelectorAll(
    '.table > tbody [type="checkbox"]'
  )

  checkboxes.forEach(function (el) {
    el.checked = event.target.checked
  })
})

// Helper function
function formatCurrency (value) {
  return value.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0
  })
}

// Fetch data from node server
window.fetch('/get')
  .then(function (response) {
    return response.json()
  })
  .then(function (items) {
    var markup = ''
    var brandModel
    var total = 0

    items.forEach(function (item, index) {
      total += item.fields.Cost
      brandModel = item.fields['Brand / Model'] ? ` (${item.fields['Brand / Model']})` : ''

      // HTML markup to be rendered
      markup += `
           <tr class="part" id="${item.id}">
              <td><input type="checkbox"></td>
              <td>${item.fields.Type}${brandModel}</td>
              <td>${formatCurrency(item.fields.Cost)}</td>
              <td>${item.fields['Purchased from']}</td>
              <td>${item.fields['Purchase Date']}</td>
           </tr>
          `
    })
    document.getElementById('total').innerHTML = formatCurrency(total)
    document.getElementById('results').innerHTML = markup
  })
