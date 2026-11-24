# Gloss Atelier — Nail Studio

SolidJS + Vite, plain CSS. Includes a live nail set builder. Bookings go to WhatsApp.

```
npm install
npm run dev      # local preview
npm run build    # outputs to dist/
```

Deploy to Cloudflare Pages: build command `npm run build`, build output directory `dist`.
If the project sits inside a folder in your repo, put that folder in Root directory (not the output directory).

## Edit the content

- `src/data.js`: WhatsApp number, prices, builder options (types, shapes, lengths, finishes, art, colours), price list and gallery looks.
- `src/App.jsx`: layout and text.
- `src/hand.js`: draws the nail illustrations (an SVG string). Leave this alone unless you want to change how the hand looks.

## Using real photos in the gallery

In `src/App.jsx`, find the gallery (`<For each={looks}>`) and replace the `innerHTML={hand(...)}` div
with an `<img src="/look1.jpg" alt="Nail set" />`. Put the photos in a `public/` folder.
