// Inport CSS
import 'spectre.css/dist/spectre.min.css'
import 'luminous-lightbox/dist/luminous-basic.css'
import './index.css'

// Import JavaScript
import { LuminousGallery } from 'luminous-lightbox'

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
  .fetch('/.netlify/functions/get-airtable-data')
  .then(function (response) {
    return response.json()
  })
  .then(function (items) {
    let markup = ''
    let brandModel
    let total = 0

    items.records.forEach(function (item) {
      total += item.fields.Cost
      brandModel = item.fields['Brand / Model']
        ? ` <span class="d-none d-lg-inline">(${
          item.fields['Brand / Model']
        })</span>`
        : ''

      // HTML markup to be rendered
      markup += `
           <tr id="${item.id}">
              <td class="cell-checkbox"><input type="checkbox"></td>
              <td class="cell-text">${item.fields.Type}${brandModel}</td>
              <td class="cell-date">${item.fields['Purchased from']}</td>
              <td class="cell-date">${item.fields['Purchase Date']}</td>
              <td class="cell-number bg-secondary">${formatCurrency(item.fields.Cost)}</td>
           </tr>
          `
    })

    // Render data
    document.getElementById('total').innerHTML = formatCurrency(total)
    document.getElementById('results').innerHTML = markup
  })

// Image gallery
// eslint-disable-next-line no-new
new LuminousGallery(
  document.querySelectorAll('.gallery-img'),
  {
    arrowNavigation: true
  },
  {
    caption: function (trigger) {
      return trigger.querySelector('img').getAttribute('alt')
    }
  }
)
