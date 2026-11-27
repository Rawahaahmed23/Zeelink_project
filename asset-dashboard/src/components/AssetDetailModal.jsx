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

export default function AssetDetailModal({ asset, onClose, onDelete }) {
  return (
    <Modal title={asset.asset_id} onClose={onClose}>
      <Thumb file={asset.photograph} big />
      <dl className="mt-4 grid grid-cols-[90px_1fr] gap-x-3 gap-y-2">
        <Fact k="Asset ID" v={asset.asset_id} />
        <Fact k="Name" v={asset.asset_name} />
        <Fact k="Category" v={asset.category} />
        <Fact k="Created" v={formatDate(asset.created_at)} />
      </dl>
      <button className={ui.danger} onClick={() => onDelete(asset)}>Delete asset</button>
    </Modal>
  );
}
