// Update footer
document.getElementById('getFullYear').innerHTML = new Date().getFullYear();

// Fetch data from node server
fetch('/get')
    .then(function(response) {
        return response.json();
    })
    .then(function(items) {
        var markup = "";
        items.forEach(function(item, index) {
          markup += `
           <tr class="part" id="${item.id}">
              <td><input type="checkbox"></td>
              <td>${item.fields.Type}</td>
              <td>${item.fields.Cost.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}</td>
              <td>${item.fields['Purchased from']}</td>
              <td>${item.fields['Purchase Date']}</td>
           </tr>
          `;              
        });
        document.getElementById('results').innerHTML = markup;
    });