import React, { useState, useMemo, useEffect, useCallback } from "react";

// Toast Component
const Toast = ({ message, type }) => (
  <div
    className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white ${
      type === "error" ? "bg-red-500" : "bg-green-600"
    }`}
  >
    {message}
  </div>
);

// CSV Export Helper
const downloadCSV = (data, filename = "data.csv") => {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const csv = [
    keys.join(","),
    ...data.map((row) => keys.map((k) => `"${row[k]}"`).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export default function DataGrid({
  data,
  columns,
  pageSize = 20,
  onEditCell,
  enableVirtualScroll = true,
  batchDelay = 1000,
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((c) => c.accessor)
  );
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [gridData, setGridData] = useState([...data]);
  const [editingCell, setEditingCell] = useState({
    rowId: null,
    accessor: null,
  });
  const [pendingEdits, setPendingEdits] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3000
    );
  };

  const filtered = useMemo(() => {
    if (!search) return gridData;
    return gridData.filter((r) =>
      Object.values(r).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, gridData]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) =>
      a[sortBy] < b[sortBy]
        ? sortOrder === "asc"
          ? -1
          : 1
        : a[sortBy] > b[sortBy]
        ? sortOrder === "asc"
          ? 1
          : -1
        : 0
    );
  }, [filtered, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  const toggleColumn = (acc) => {
    setVisibleColumns((prev) =>
      prev.includes(acc) ? prev.filter((c) => c !== acc) : [...prev, acc]
    );
  };

  const saveEdit = (rowId, accessor, value) => {
    setGridData((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [accessor]: value } : r))
    );
    setPendingEdits((prev) => [...prev, { rowId, accessor, value }]);
  };

  const scheduleSave = useCallback(() => {
    if (!pendingEdits.length || !onEditCell) return;
    setIsSaving(true);
    const batch = [...pendingEdits];
    setPendingEdits([]);
    Promise.all(
      batch.map((edit) =>
        onEditCell(edit).catch(() =>
          showToast(`Failed update row ${edit.rowId}`, "error")
        )
      )
    )
      .then(() => showToast("All changes saved"))
      .finally(() => setIsSaving(false));
  }, [pendingEdits, onEditCell]);

  useEffect(() => {
    const h = setTimeout(scheduleSave, batchDelay);
    return () => clearTimeout(h);
  }, [pendingEdits, scheduleSave, batchDelay]);

  return (
    <div className="relative p-4 border rounded bg-white shadow-sm text-sm">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.msg} type={t.type} />
      ))}

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
        <input
          type="text"
          placeholder="🔍 Search…"
          className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button
          onClick={() =>
            downloadCSV(selectedRows.length ? selectedRows : gridData)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          ⬇ Export
        </button>
        <div className="relative">
          <button
            onClick={() => setShowColumnMenu((v) => !v)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            ☰ Columns
          </button>
          {showColumnMenu && (
            <div className="absolute right-0 mt-1 w-48 bg-white border rounded shadow p-2 max-h-48 overflow-auto z-10">
              {columns.map((c) => (
                <label key={c.accessor} className="flex items-center py-1">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(c.accessor)}
                    onChange={() => toggleColumn(c.accessor)}
                    className="mr-2"
                  />
                  {c.header}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spinner */}
      {isSaving && (
        <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent animate-spin rounded-full" />
        </div>
      )}

      {/* Table */}
      <div
        style={{
          maxHeight: enableVirtualScroll ? 300 : "auto",
          overflow: "auto",
        }}
      >
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky top-0 bg-white border px-2 py-1">
                <input
                  type="checkbox"
                  checked={
                    paginated.length &&
                    paginated.every((r) => selectedRows.includes(r))
                  }
                  onChange={() => {
                    const all = paginated.every((r) =>
                      selectedRows.includes(r)
                    );
                    setSelectedRows((prev) =>
                      all
                        ? prev.filter((r) => !paginated.includes(r))
                        : [
                            ...prev,
                            ...paginated.filter((r) => !prev.includes(r)),
                          ]
                    );
                  }}
                />
              </th>
              {columns
                .filter((c) => visibleColumns.includes(c.accessor))
                .map((c) => (
                  <th
                    key={c.accessor}
                    onClick={() => {
                      setSortBy(c.accessor);
                      setSortOrder((prev) =>
                        sortBy === c.accessor && prev === "asc" ? "desc" : "asc"
                      );
                    }}
                    className="sticky top-0 px-4 py-2 bg-gray-50 border font-medium text-left cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-1">
                      {c.header}
                      {sortBy === c.accessor &&
                        (sortOrder === "asc" ? "▲" : "▼")}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr key={row.id} className="border hover:bg-gray-50">
                <td className="px-2 py-1">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => {
                      setSelectedRows((prev) =>
                        prev.includes(row)
                          ? prev.filter((r) => r !== row)
                          : [...prev, row]
                      );
                    }}
                  />
                </td>
                {columns
                  .filter((c) => visibleColumns.includes(c.accessor))
                  .map((c) => {
                    const editing =
                      editingCell.rowId === row.id &&
                      editingCell.accessor === c.accessor;
                    return (
                      <td
                        key={c.accessor}
                        className="px-4 py-2"
                        onClick={() =>
                          setEditingCell({
                            rowId: row.id,
                            accessor: c.accessor,
                          })
                        }
                      >
                        {editing ? (
                          <input
                            type="text"
                            defaultValue={row[c.accessor]}
                            autoFocus
                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring"
                            onBlur={(e) => {
                              saveEdit(row.id, c.accessor, e.target.value);
                              setEditingCell({ rowId: null, accessor: null });
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                saveEdit(row.id, c.accessor, e.target.value);
                                setEditingCell({ rowId: null, accessor: null });
                              }
                            }}
                          />
                        ) : (
                          row[c.accessor]
                        )}
                      </td>
                    );
                  })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
