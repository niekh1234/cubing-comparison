export type Table = {
  rows: TableRow[];
};

export type TableRow = {
  event: string;
  average: number;
  target: string;
  key: string;
};
