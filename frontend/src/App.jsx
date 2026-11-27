
import { useEffect, useState, useCallback } from "react";
import { getAssets, searchAssets, getAsset, deleteAsset } from "./api.js";
import { ui } from "./utils/ui.js";

import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import AssetList from "./components/AssetList.jsx";
import AddAssetModal from "./components/AddAssetModal.jsx";
import AssetDetailModal from "./components/AssetDetailModal.jsx";
import EditAssetModal from "./components/EditAssetModal.jsx";

export default function App() {
  const [assets, setAssets] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  // Load assets
  const load = useCallback(async (q = "") => {
    setLoading(true);
    setError("");

    try {
      const data = q.trim()
        ? await searchAssets(q.trim())
        : await getAssets();

      setAssets(data.assets || []);
    } catch (e) {
      setError(
        e.message === "Failed to fetch"
          ? "Cannot reach the server. Check that the backend is running."
          : e.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => load(query), 300);
    return () => clearTimeout(timer);
  }, [query, load]);

  // Open asset details
  const openAsset = async (asset) => {
    setSelected(asset);

    try {
      const data = await getAsset(asset.asset_id);
      setSelected(data.asset);
    } catch {
      // Keep existing asset data
    }
  };

  // Open edit modal
  const startEdit = (asset) => {
    setSelected(null);
    setEditing(asset);
  };

  // Save edited asset
  const handleEdited = () => {
    setEditing(null);
    load(query);
  };

  // Delete asset
  const removeAsset = async (asset) => {
    if (!confirm(`Delete asset ${asset.asset_id}?`)) return;

    try {
      await deleteAsset(asset.id);
      setSelected(null);
      load(query);
    } catch (e) {
      alert(e.message);
    }
  };

  // Save new asset
  const handleSaved = () => {
    setShowForm(false);
    setQuery("");
    load("");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-5">
      <Header
        loading={loading}
        count={assets.length}
        onAdd={() => setShowForm(true)}
      />

      <SearchBar value={query} onChange={setQuery} />

      {error && <div className={ui.alert}>{error}</div>}

      <AssetList
        assets={assets}
        query={query}
        loading={loading}
        error={error}
        onOpen={openAsset}
      />

      {showForm && (
        <AddAssetModal
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}

      {selected && (
        <AssetDetailModal
          asset={selected}
          onClose={() => setSelected(null)}
          onEdit={startEdit}
          onDelete={removeAsset}
        />
      )}

      {editing && (
        <EditAssetModal
          key={editing.id}
          asset={editing}
          onClose={() => setEditing(null)}
          onSaved={handleEdited}
        />
      )}
    </div>
  );
}
