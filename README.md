# myportfolio

Personal portfolio site for Mudia Imasuen — filmmaker & designer based in Kaduna.

Built with React, TypeScript, and Vite.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Hero section

`src/components/Hero.tsx` implements the landing hero at a 1920×1080 design frame, laid out on a
12-column grid (30px margin, 20px gutter). It uses two custom typefaces — Delight (variable weight,
headline/body) and Fat (display, used for the "DESIGNER" emphasis word) — loaded from `public/fonts`.
The bottom-left corner shows the visitor's live local time and timezone.

## Interactions

- **Hover sounds** — each project in the Selected Work list plays its own [snd-lib](https://snd.dev/)
  sound on hover (kit 01 "sine"). The audio sprite is self-hosted in `public/sounds` rather than
  fetched from jsDelivr. Sound-per-project mapping lives in `src/data/projects.ts`.
- **Motion** — framer-motion springs the hovered item sideways and dims the rest.
- **Hand control** — the "Enable hand control" button (bottom right) asks for camera permission and
  runs Google MediaPipe hand tracking fully in-browser (model + wasm self-hosted in `public/models`
  and `public/mediapipe`; no video ever leaves the page). Your index fingertip drives a cursor node
  that highlights projects; pinching thumb + index twice quickly acts as a click, which plays a
  sound and opens the project in a new page. Project URLs are `#slug` placeholders in
  `src/data/projects.ts` — replace them with real case-study links.
