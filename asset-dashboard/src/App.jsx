import { useEffect, useState, useCallback } from "react";
import { getAssets, searchAssets, getAsset, deleteAsset } from "./api.js";
import { ui } from "./utils/ui.js";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import AssetList from "./components/AssetList.jsx";
import AddAssetModal from "./components/AddAssetModal.jsx";
import AssetDetailModal from "./components/AssetDetailModal.jsx";

export default function App() {
  const [assets, setAssets] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = useCallback(async (q) => {
    setLoading(true);
    setError("");
    try {
      const data = q.trim() ? await searchAssets(q.trim()) : await getAssets();
      setAssets(data.assets || []);
    } catch (e) {
      setError(e.message === "Failed to fetch"
        ? "Cannot reach the server. Check that the backend is running."
        : e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search as the operator types (waits 300 ms after the last keystroke)
  useEffect(() => {
    const t = setTimeout(() => load(query), 300);
    return () => clearTimeout(t);
  }, [query, load]);

  const openAsset = async (a) => {
    setSelected(a); // show immediately, then refresh from the server
    try { setSelected((await getAsset(a.asset_id)).asset); } catch { /* keep list data */ }
  };

  const removeAsset = async (a) => {
    if (!confirm(`Delete asset ${a.asset_id}?`)) return;
    try {
      await deleteAsset(a.id);
      setSelected(null);
      load(query);
    } catch (e) { alert(e.message); }
  };

  const handleSaved = () => { setShowForm(false); setQuery(""); load(""); };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-5">
      <Header loading={loading} count={assets.length} onAdd={() => setShowForm(true)} />
      <SearchBar value={query} onChange={setQuery} />
      {error && <div className={ui.alert}>{error}</div>}
      <AssetList assets={assets} query={query} loading={loading} error={error} onOpen={openAsset} />

      {showForm && <AddAssetModal onClose={() => setShowForm(false)} onSaved={handleSaved} />}
      {selected && (
        <AssetDetailModal asset={selected} onClose={() => setSelected(null)} onDelete={removeAsset} />
      )}
    </div>
  );
}
