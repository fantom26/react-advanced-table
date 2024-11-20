import { useState } from "react";

import { Icon, Table, TableRootProps } from "@chakra-ui/react";
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
  tableConfig?: TableRootProps;
};

function DataTable<Data extends object>({
  tableConfig,
  data,
  columns
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });

  return (
    <Table.Root {...tableConfig}>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const cellAlign =
                header.column.columnDef?.meta?.textAlign?.th ?? "start";

              return (
                <Table.ColumnHeader
                  key={header.id}
                  textAlign={cellAlign}
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
                </Table.ColumnHeader>
              );
            })}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const cellAlign =
                cell.column.columnDef?.meta?.textAlign?.td ?? "start";

              return (
                <Table.Cell key={cell.id} textAlign={cellAlign}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default DataTable;
