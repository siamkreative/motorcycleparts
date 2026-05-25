## Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/64a552dd-8501-4157-943f-018a1e9f0e71/deploy-status)](https://app.netlify.com/sites/motorcycleparts/deploys)

- [Demo site](https://motorcycleparts.netlify.app/)

## About

<img width="2293" height="3424" alt="image" src="https://github.com/user-attachments/assets/70c5f08c-880b-4111-83d4-8923e25ea7b8" />

Personal page listing aftermarket parts added to a Yamaha MT-07, with a photo gallery. Built with Vite, Tailwind CSS v4, Alpine.js, and GLightbox. Data comes from [this Airtable](https://airtable.com/shrxx5mmDuAAjnc7J), served via a Netlify Function to keep the API key server-side.

## Getting started

Create a `.env` file with your Airtable credentials (get an API token at https://airtable.com/create/tokens):

```
AT_API_KEY=XXXXX
AT_BASE=XXXXX
AT_TABLE=XXXXX
```

Install dependencies:

```bash
npm install
```

Run the full stack locally (Vite + Netlify Function):

```bash
netlify dev
```

Or run Vite only (UI works, Airtable data won't load):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```
