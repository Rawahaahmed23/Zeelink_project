import AssetRow from "./AssetRow.jsx";

export default function AssetList({ assets, query, loading, error, onOpen }) {
  if (!loading && !error && assets.length === 0) {
    return (
      <div className="py-10 text-center text-stone-500 dark:text-stone-400">
        {query ? `No asset ID matches “${query}”.` : "No assets yet. Add the first one."}
      </div>
    );
  }
  return (
    <ul className="overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
      {assets.map((a) => <AssetRow key={a.id} asset={a} onOpen={onOpen} />)}
    </ul>
  );
}
