# Warehouse Asset Dashboard (frontend)

React + Vite + Tailwind CSS v4. Talks to the Node/Express + SQLite backend over REST.

## Run

```bash
npm install
npm run dev        # http://<this-pc-ip>:5173 (reachable from phones on the LAN)
```

By default the app calls `http://<same-host-as-page>:5000`.
To point somewhere else, copy `.env.example` to `.env` and set `VITE_API_URL`.

Production build: `npm run build` → serve `dist/` (or `npm run preview`).

## Backend routes this frontend expects

| Method | Path                          | Notes                              |
|--------|-------------------------------|------------------------------------|
| GET    | /api/assets                   | list                               |
| GET    | /api/search?asset_id=         | partial match                      |
| GET    | /api/assets/:asset_id         | single record                      |
| POST   | /api/add                      | multipart: asset_id, asset_name, category, photograph |
| DELETE | /api/delete/:id               | numeric row id                     |
| GET    | /uploads/<file>               | static images                      |

## Backend checklist (LAN access)

```js
import cors from "cors";
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.listen(5000, "0.0.0.0");   // listen on all interfaces, not just localhost
```
Allow ports 5000 and 5173 in the warehouse PC's firewall.
Multer field name must be `photograph`: `upload.single("photograph")`.

## Project structure

```
src/
  api.js                      REST calls (single place to change URLs)
  App.jsx                     state + data loading
  index.css                   Tailwind import
  utils/format.js             categories, date formatting
  utils/ui.js                 shared Tailwind class strings (buttons, inputs)
  components/
    Header.jsx                title, count, "Add asset" button
    SearchBar.jsx             Asset ID search input
    AssetList.jsx             list / empty state
    AssetRow.jsx              one record row
    Thumb.jsx                 photo or "No photo" placeholder
    Modal.jsx                 shared modal shell (Esc to close)
    AddAssetModal.jsx         entry form + photo upload
    AssetDetailModal.jsx      full record view + delete
```
