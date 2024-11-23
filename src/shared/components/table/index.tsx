import { useState } from "react";

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
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

const sortIcon = {
  asc: <TiArrowSortedUp />,
  desc: <TiArrowSortedDown />
};

const SortingIndicator = ({ value }: { value: SortDirection | false }) => {
  return value ? sortIcon[value] : null;
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

  const { rows } = table.getRowModel();

  const Row = ({ index, style }: ListChildComponentProps) => {
    const { id, getVisibleCells } = rows[index];
    return (
      <div
        key={id}
        className={`grid items-center px-2 py-2 ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
        style={{
          ...style,
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`
        }}
      >
        {getVisibleCells().map((cell) => {
          const cellAlign =
            cell.column.columnDef?.meta?.textAlign?.td ?? "left";

          return (
            <div
              className={`px-2 py-2 border-gray-300 flex justify-center items-center text-${cellAlign} text-sm text-gray-700`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      {table.getHeaderGroups().map(({ headers, id }) => (
        <div
          key={id}
          className="grid bg-gray-100 sticky top-0 z-10 px-2 py-2"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            paddingRight: "16px"
          }}
        >
          {headers.map(({ column, id, getContext }) => {
            const cellAlign = column.columnDef?.meta?.textAlign?.th ?? "left";

            return (
              <div
                key={id}
                className={`px-2 py-2 border-gray-300 flex justify-center items-center text-${cellAlign} text-sm font-semibold text-gray-700`}
                style={{
                  cursor: column.getCanSort() ? "pointer" : "default"
                }}
                onClick={column.getToggleSortingHandler()}
              >
                {flexRender(column.columnDef.header, getContext())}
                <SortingIndicator value={column.getIsSorted()} />
              </div>
            );
          })}
        </div>
      ))}
      <List height={700} itemCount={rows.length} itemSize={60} width="100%">
        {Row}
      </List>
    </div>
  );
}

export default DataTable;
