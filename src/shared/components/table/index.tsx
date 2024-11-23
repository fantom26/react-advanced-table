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

const rowClassNames = "grid gap-2 items-center py-2 px-2";
const cellClassNames =
  "border-gray-300 flex justify-center items-center text-sm text-gray-700";

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

  const Row = ({ index, isScrolling, style }: ListChildComponentProps) => {
    const { id, getVisibleCells } = rows[index];

    const isRowStripped = index % 2 === 0 ? "bg-white" : "bg-gray-100";
    const isRowLoading = isScrolling ? "animate-pulse" : "";

    return (
      <div
        role="row"
        key={id}
        className={`${rowClassNames} ${isRowStripped} ${isRowLoading}`}
        style={{
          ...style,
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`
        }}
      >
        {getVisibleCells().map((cell) => {
          const cellAlign =
            cell.column.columnDef?.meta?.textAlign?.td ?? "left";

          return (
            <>
              {isScrolling ? (
                <div className="px-3 py-3 bg-gray-300 rounded"></div>
              ) : (
                <div className={`${cellClassNames} text-${cellAlign} `}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              )}
            </>
          );
        })}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto border border-gray-300">
      {table.getHeaderGroups().map(({ headers, id }) => (
        <div
          role="row"
          key={id}
          className={`${rowClassNames} bg-gray-200 sticky top-0 z-10`}
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            paddingRight: "calc(16px + 0.5rem)"
          }}
        >
          {headers.map(({ column, id, getContext }) => {
            const cellAlign = column.columnDef?.meta?.textAlign?.th ?? "left";

            return (
              <div
                key={id}
                className={`${cellClassNames} text-${cellAlign}`}
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
      <List
        height={700}
        itemCount={rows.length}
        overscanCount={10}
        useIsScrolling
        itemSize={56}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
}

export default DataTable;
