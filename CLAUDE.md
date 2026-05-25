# motorcycleparts

Personal page listing Yamaha MT-07 aftermarket parts, with a photo gallery. Deployed on Netlify.

## Stack

- **Vite 6** — bundler, `root: 'src'`, output to `dist/`
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin, single `@import "tailwindcss"` in `src/index.css`
- **Alpine.js** — reactive parts table (`x-data="parts"` in `src/index.html`)
- **GLightbox** — photo lightbox (`selector: '.glightbox'`)
- **Netlify Functions** — `netlify/functions/get-airtable-data.js` proxies the Airtable REST API to keep the key server-side

## Dev commands

```bash
npm run dev      # Vite only — UI works, Airtable function is NOT served
netlify dev      # Full stack — runs Vite + Netlify function together (requires netlify-cli)
npm run build    # Production build → dist/
```

## Local environment

To test the Airtable data flow locally, create a `.env` file (already gitignored):

```
AT_API_KEY=your_airtable_personal_access_token
AT_BASE=your_base_id
AT_TABLE=your_table_name
```

Then use `netlify dev` (not `npm run dev`). See issue #27.

## Data

Parts data lives in [this Airtable base](https://airtable.com/shrxx5mmDuAAjnc7J). The function fetches up to 100 records from the `Grid view` and caches the response for 5 minutes (`cache-control: max-age=300, public`).
