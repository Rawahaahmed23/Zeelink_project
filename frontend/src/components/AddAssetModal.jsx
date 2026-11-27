import { useState } from "react";
import Modal from "./Modal.jsx";
import { createAsset } from "../api.js";
import { CATEGORIES } from "../utils/format.js";
import { ui } from "../utils/ui.js";

const label = "grid gap-1.5 text-sm font-semibold";

export default function AddAssetModal({ onClose, onSaved }) {
  const [f, setF] = useState({ asset_id: "", asset_name: "", category: CATEGORIES[0] });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const set = (key) => (e) => setF({ ...f, [key]: e.target.value });

  const pick = (e) => {
    const x = e.target.files[0];
    setFile(x || null);
    setPreview(x ? URL.createObjectURL(x) : null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const fd = new FormData();
    fd.append("asset_id", f.asset_id.trim());
    fd.append("asset_name", f.asset_name.trim());
    fd.append("category", f.category);
    if (file) fd.append("photograph", file); 
    try { await createAsset(fd); onSaved(); }
    catch (e2) { setErr(e2.message); setBusy(false); }
  };

  return (
    <Modal title="Add asset" onClose={onClose}>
      <form onSubmit={submit} className="grid gap-3.5">
        <label className={label}>Asset ID
          <input required className={ui.input} value={f.asset_id} onChange={set("asset_id")} />
        </label>
        <label className={label}>Asset name
          <input required className={ui.input} value={f.asset_name} onChange={set("asset_name")} />
        </label>
        <label className={label}>Category
          <select className={ui.input} value={f.category} onChange={set("category")}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className={label}>Photograph
          <input type="file" accept="image/*" capture="environment" onChange={pick} className={ui.input} />
        </label>
        {preview && <img src={preview} alt="Selected" className="max-h-90 w-full rounded-md object-contain" />}
        {err && <div className={ui.alert}>{err}</div>}
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Date and time are recorded automatically when you save.
        </p>
        <button className={ui.primary} disabled={busy}>{busy ? "Saving…" : "Save asset"}</button>
      </form>
    </Modal>
  );
}
