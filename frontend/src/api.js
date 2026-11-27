// Base URL
export const API_URL =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:5000`;



async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  console.log((data));
  return data;
  
}

export const getAssets = () => request("/api/assets");

export const searchAssets = (q) =>
  request(`/api/search?asset_id=${encodeURIComponent(q)}`);

export const getAsset = (assetId) =>
  request(`/api/assets/${encodeURIComponent(assetId)}`);

export const createAsset = (formData) =>
  request("/api/add", { method: "POST", body: formData });

// Update Asset
export const updateAsset = (id, formData) =>
  request(`/api/edit/${id}`, { method: "PATCH", body: formData });

// Delete Asset
export const deleteAsset = (id) =>
  request(`/api/delete/${id}`, { method: "DELETE" });



export const getCategories = () => 
  request(`/api/category`, { method: "DELETE" });;