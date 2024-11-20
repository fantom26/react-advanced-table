import "@tanstack/react-table";

export type tableCellAlign = "start" | "center" | "end";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    textAlign?: {
      th: tableCellAlign;
      td: tableCellAlign;
    };
  }
}
