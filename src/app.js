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

// Currency helper function
const formatCurrency = value =>
  value.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0
  })

// Fetch data from node server
window
  .fetch('/get')
  .then(function (response) {
    return response.json()
  })
  .then(function (items) {
    let markup = ''
    let brandModel
    let formattedDate
    let total = 0

    items.forEach(function (item) {
      total += item.fields.Cost
      formattedDate = new Date(item.fields['Purchase Date'])
      formattedDate = `${formattedDate.getDate()} - ${(formattedDate.getMonth() + 1)} - ${formattedDate.getFullYear()}`
      brandModel = item.fields['Brand / Model']
        ? ` <span class="d-none d-lg-inline">(${item.fields['Brand / Model']})</span>`
        : ''

      // HTML markup to be rendered
      markup += `
           <tr class="part" id="${item.id}">
              <td><input type="checkbox"></td>
              <td>${item.fields.Type}${brandModel}</td>
              <td data-sort="${item.fields.Cost}">${formatCurrency(item.fields.Cost)}</td>
              <td>${item.fields['Purchased from']}</td>
              <td data-sort="${formattedDate}">${item.fields['Purchase Date']}</td>
           </tr>
          `
    })

    // Render data
    document.getElementById('total').innerHTML = formatCurrency(total)
    document.getElementById('results').innerHTML = markup

    // Sort table
    new Tablesort(document.getElementById('parts'))
  })

// Image gallery
new LuminousGallery(document.querySelectorAll('.gallery-img'), {
  arrowNavigation: true
}, {
  caption: function (trigger) {
    return trigger.querySelector('img').getAttribute('alt')
  }
})