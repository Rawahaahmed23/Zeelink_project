import { useState } from "react";
import Modal from "./Modal.jsx";
import Thumb from "./Thumb.jsx";
import { updateAsset } from "../api.js";
import { CATEGORIES } from "../utils/format.js";
import { ui } from "../utils/ui.js";

const label = "grid gap-1.5 text-sm font-semibold";

export default function EditAssetModal({ asset, onClose, onSaved }) {
  
  const [f, setF] = useState({
    asset_id: asset.asset_id,
    asset_name: asset.asset_name,
    category: asset.category,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  // Keep a category that isn't in the default list selectable
  const categories = CATEGORIES.includes(f.category) ? CATEGORIES : [f.category, ...CATEGORIES];

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
    try {
      await updateAsset(asset.id, fd); 
      onSaved();
    } catch (e2) {
      setErr(e2.message);
      setBusy(false);
    }
  };

  return (
    <Modal title={`Edit ${asset.asset_id}`} onClose={onClose}>
      <form onSubmit={submit} className="grid gap-3.5">
        <label className={label}>Asset ID
          <input required className={ui.input} value={f.asset_id} onChange={set("asset_id")} />
        </label>
        <label className={label}>Asset name
          <input required className={ui.input} value={f.asset_name} onChange={set("asset_name")} />
        </label>
        <label className={label}>Category
          <select className={ui.input} value={f.category} onChange={set("category")}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>

        <div className="grid gap-1.5 text-sm font-semibold">
          {preview ? "New photograph" : "Current photograph"}
          {preview
            ? <img src={preview} alt="New" className="max-h-90 w-full rounded-md object-contain" />
            : <Thumb file={asset.photograph} big />}
        </div>
        <label className={label}>Replace photograph (optional)
          <input type="file" accept="image/*" capture="environment" onChange={pick} className={ui.input} />
        </label>

        {err && <div className={ui.alert}>{err}</div>}
        <div className="flex gap-3">
          <button className={`${ui.primary} flex-1`} disabled={busy}>{busy ? "Saving…" : "Save changes"}</button>
          <button type="button" className={ui.ghost} onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}