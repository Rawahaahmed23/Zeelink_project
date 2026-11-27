import { useEffect } from "react";
import { ui } from "../utils/ui.js";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-black/50 p-3" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-md overflow-auto rounded-xl bg-white p-5 dark:bg-neutral-800"
      >
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className={ui.ghost} onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
