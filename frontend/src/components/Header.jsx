import { ui } from "../utils/ui.js";

export default function Header({ loading, count, onAdd }) {
  return (
    <header className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold">Warehouse assets</h1>
        <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
          {loading ? "Loading…" : `${count} record${count === 1 ? "" : "s"}`}
        </p>
      </div>
      <button className={ui.primary} onClick={onAdd}>Add asset</button>
    </header>
  );
}
