// Base URL: env override, otherwise same host as the page on port 5000.
// This lets phones/PCs on the LAN reach the warehouse server automatically.
export const API_URL =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:5000`;

export const imageUrl = (file) => (file ? `${API_URL}/uploads/${file}` : null);

async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export const getAssets = () => request("/api/assets");
export const searchAssets = (q) =>
  request(`/api/search?asset_id=${encodeURIComponent(q)}`);
export const getAsset = (assetId) =>
  request(`/api/assets/${encodeURIComponent(assetId)}`);
export const createAsset = (formData) =>
  request("/api/add", { method: "POST", body: formData });
export const deleteAsset = (id) =>
  request(`/api/delete/${id}`, { method: "DELETE" });
