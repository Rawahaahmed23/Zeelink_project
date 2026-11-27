// Shared Tailwind class strings
const btn = "rounded-md border px-4 py-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-wait focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";

export const ui = {
  primary: `${btn} border-emerald-800 bg-emerald-800 font-semibold text-white hover:bg-emerald-900 dark:border-emerald-500 dark:bg-emerald-500 dark:text-neutral-900 dark:hover:bg-emerald-400`,
  ghost: `${btn} border-transparent hover:bg-stone-100 dark:hover:bg-neutral-700`,
  danger: `${btn} mt-4 border-red-700 text-red-700 hover:bg-red-50 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-950`,
  input: "w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 dark:border-neutral-600 dark:bg-neutral-800",
  alert: "my-3 rounded-md bg-red-50 px-3 py-2.5 text-red-800 dark:bg-red-950 dark:text-red-200",
};
