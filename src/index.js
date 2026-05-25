import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'
import './index.css'
import Alpine from 'alpinejs'

const formatCurrency = value =>
  value.toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })

document.addEventListener('alpine:init', () => {
  Alpine.data('parts', () => ({
    records: [],
    loading: true,
    allChecked: false,

    get total() {
      return this.records.reduce((sum, r) => sum + (r.fields.Cost || 0), 0)
    },

    get totalText() {
      return this.loading ? '—' : formatCurrency(this.total)
    },

    formatCurrency,

    toggleAll() {
      this.records.forEach(r => { r.checked = this.allChecked })
    },

    async init() {
      const res = await fetch('/.netlify/functions/get-airtable-data')
      const data = await res.json()
      this.records = data.records.map(r => ({ ...r, checked: false }))
      this.loading = false
    }
  }))
})

window.Alpine = Alpine
Alpine.start()

GLightbox({ selector: '.glightbox' })
