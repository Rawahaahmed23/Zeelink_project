export const CATEGORIES = ["Machinery", "Tools", "Vehicle", "Electronics", "Furniture", "Other"];

// SQLite CURRENT_TIMESTAMP is UTC ("YYYY-MM-DD HH:MM:SS"); show it in local time.
export const formatDate = (d) =>
  d ? new Date(d.includes("T") ? d : d.replace(" ", "T") + "Z").toLocaleString() : "—";
