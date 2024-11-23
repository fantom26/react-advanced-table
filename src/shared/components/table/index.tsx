import { useState } from "react";

import { Icon } from "@chakra-ui/react";
import {
  ColumnDef,
  SortDirection,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const sortIcon = {
  asc: <TiArrowSortedUp />,
  desc: <TiArrowSortedDown />
};

const SortingIndicator = ({ value }: { value: SortDirection | false }) => {
  return value ? <Icon>{sortIcon[value]}</Icon> : null;
};

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data>[];
};

function DataTable<Data extends object>({
  data,
  columns
}: DataTableProps<Data>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100 sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const cellAlign =
                  header.column.columnDef?.meta?.textAlign?.th ?? "left";

                return (
                  <th
                    key={header.id}
                    className={`px-4 py-2 border-b border-gray-300 text-${cellAlign} text-sm font-semibold text-gray-700`}
                    style={{
                      cursor: header.column.getCanSort() ? "pointer" : "default"
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <SortingIndicator value={header.column.getIsSorted()} />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {row.getVisibleCells().map((cell) => {
                const cellAlign =
                  cell.column.columnDef?.meta?.textAlign?.td ?? "left";

                return (
                  <td
                    className={`px-4 py-2 border-b border-gray-300 text-${cellAlign} text-sm text-gray-700`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
