import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JournalFilter({ filters, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full space-y-3 bg-[var(--color-dark-background)] mb-4 rounded-lg"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 mb-0 font-medium"
      >
        Filter
        <motion.div
          key={open ? "up" : "down"}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 2 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </motion.div>
      </button>

      {/* Filter Form (Collapsible) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="filter-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Stock Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
                  Stock Name
                </label>
                <input
                  type="text"
                  value={filters.stock}
                  onChange={(e) => onChange({ ...filters, stock: e.target.value })}
                  placeholder="e.g. AAPL"
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-[var(--color-nav-background)]"
                />
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => onChange({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-[var(--color-nav-background)]"
                >
                  <option value="">All Types</option>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
                  Date Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) =>
                      onChange({ ...filters, fromDate: e.target.value })
                    }
                    className="w-1/2 px-3 py-2 text-sm rounded-md border border-gray-300 bg-[var(--color-nav-background)]"
                  />
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) =>
                      onChange({ ...filters, toDate: e.target.value })
                    }
                    className="w-1/2 px-3 py-2 text-sm rounded-md border border-gray-300 bg-[var(--color-nav-background)]"
                  />
                </div>
              </div>

              <motion.button
                type="button"
                onClick={() => setTimeout(() => setOpen(false), 100)}
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 1.02 }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
                className="mt-2 w-full bg-[var(--color-text)] text-white py-2 rounded-md text-sm font-medium hover:opacity-80"
              >
                Apply Filter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}