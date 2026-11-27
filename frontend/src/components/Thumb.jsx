export default function Thumb({ file, big }) {
  const src = file;

  
  if (src) {
    return big
      ? <img src={src} alt="" className="max-h-90 w-full rounded-md bg-stone-100 object-contain dark:bg-neutral-900" />
      : <img src={src} alt="" loading="lazy" className="h-14 w-14 rounded-md bg-stone-200 object-cover dark:bg-neutral-700" />;
  }
  return big
    ? <div className="grid h-40 place-items-center rounded-md bg-stone-100 text-sm text-stone-500 dark:bg-neutral-900">No photo</div>
    : <div className="grid h-14 w-14 place-items-center rounded-md bg-stone-200 text-[11px] text-stone-500 dark:bg-neutral-700">No photo</div>;
}
