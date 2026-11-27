import { ui } from "../utils/ui.js";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className={`${ui.input} mb-4`}
      type="search"
      placeholder="Search by Asset ID"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
