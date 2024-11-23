import "@tanstack/react-table";

export type tableCellAlign = "left" | "center" | "right";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    textAlign?: {
      th: tableCellAlign;
      td: tableCellAlign;
    };
  }
}
