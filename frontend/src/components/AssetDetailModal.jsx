import Modal from "./Modal.jsx";
import Thumb from "./Thumb.jsx";
import { formatDate } from "../utils/format.js";
import { ui } from "../utils/ui.js";

const Fact = ({ k, v }) => (
  <>
    <dt className="text-stone-500 dark:text-stone-400">{k}</dt>
    <dd className="break-words">{v}</dd>
  </>
);

export default function AssetDetailModal({ asset, onClose, onDelete, onEdit }) {
  return (
    <Modal title={asset.asset_id} onClose={onClose}>
      <Thumb file={asset.photograph} big />
      <dl className="mt-4 grid grid-cols-[90px_1fr] gap-x-3 gap-y-2">
        <Fact k="Asset ID" v={asset.asset_id} />
        <Fact k="Name" v={asset.asset_name} />
        <Fact k="Category" v={asset.category} />
        <Fact k="Created" v={formatDate(asset.created_at)} />
      </dl>
     <div className="mt-5 flex gap-3">
  <button
    onClick={() => onEdit(asset)}
    className="flex-1 h-11 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
  >
    Edit asset
  </button>

  <button
    onClick={() => onDelete(asset)}
    className="flex-1 h-11 rounded-lg border border-red-400 text-red-400 text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors"
  >
    Delete asset
  </button>
</div>
    </Modal>
  );
}