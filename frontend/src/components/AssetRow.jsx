import Thumb from "./Thumb.jsx";
import { formatDate } from "../utils/format.js";

export default function AssetRow({ asset, onOpen }) {
  return (
    <li
      tabIndex={0}
      onClick={() => onOpen(asset)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(asset)}
      className="grid cursor-pointer grid-cols-[56px_1fr] items-center gap-x-3.5 gap-y-1 border-b border-stone-200 px-3.5 py-2.5 last:border-b-0 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-700 sm:grid-cols-[56px_1fr_130px_190px] dark:border-neutral-700 dark:hover:bg-emerald-950"
    >
      <Thumb file={asset.photograph} />
      <div className="flex min-w-0 flex-col">
        <strong>{asset.asset_name}</strong>
        <span className="truncate text-sm text-stone-500 dark:text-stone-400">{asset.asset_id}</span>
      </div>
      <div className="col-start-2 sm:col-start-auto">
        <span className="inline-block rounded-full border border-stone-300 px-2.5 py-0.5 text-sm dark:border-neutral-600">
          {asset.category}
        </span>
      </div>
      <div className="col-start-2 text-sm text-stone-500 sm:col-start-auto dark:text-stone-400">
        {formatDate(asset.created_at)}
      </div>
    </li>
  );
}
