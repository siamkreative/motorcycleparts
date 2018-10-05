// Update footer
document.getElementById('getFullYear').innerHTML = new Date().getFullYear()

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

// Fetch data from node server
window.fetch('/get')
  .then(function (response) {
    return response.json()
  })
  .then(function (items) {
    var markup = ''
    var formattedCost
    items.forEach(function (item, index) {
      formattedCost = item.fields.Cost.toLocaleString('th-TH', {
        style: 'currency',
        currency: 'THB'
      })
      markup += `
           <tr class="part" id="${item.id}">
              <td><input type="checkbox"></td>
              <td>${item.fields.Type}</td>
              <td>${formattedCost}</td>
              <td>${item.fields['Purchased from']}</td>
              <td>${item.fields['Purchase Date']}</td>
           </tr>
          `
    })
    document.getElementById('results').innerHTML = markup
  })
