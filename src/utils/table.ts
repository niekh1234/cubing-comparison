import { getTimeInSeconds, getTimeString } from './parse-time';
import { events } from '../../data/events.json';
import { Table, TableRow } from '../types';

export const createTableSeed = () => {
  const rows = events.map((event) => ({
    key: event.key,
    event: event.title,
    type: event.type,
    average: getTimeInSeconds(event.average),
    target: '',
  }));

  return { rows };
};

export const updateTable = (time: string, eventKey: string, currentTable: Table): Table => {
  // we first get the ratio between the current event and the first event in the table (2x2 probably)
  const targetRow = currentTable.rows.find((row) => row.key === eventKey);

  if (!targetRow) {
    return currentTable;
  }

  const [firstRow] = currentTable.rows;
  const ratioToFirst = targetRow['average'] / firstRow['average'];
  const asFirst = getTimeInSeconds(time) / ratioToFirst;

  // we now have the time of the first element, meaning that one loop over every row is enough to update all
  const updatedRows: TableRow[] = currentTable.rows.map((row) => {
    if (row.key === eventKey) {
      return {
        ...row,
        target: time,
      };
    }

    const currentRatio = row['average'] / firstRow['average'];
    const newTime = asFirst * currentRatio;

    return {
      ...row,
      target: getTimeString(newTime),
    };
  });

  return {
    rows: updatedRows,
  };
};

export const divideTableByRowType = (table: Table, showSideEvents: Boolean): TableRow[][] => {
  return table.rows.reduce(
    (acc: TableRow[][], row) => {
      if (row.type === 'side' && !showSideEvents) {
        return acc;
      }

      row.type === 'nxn' ? acc[0].push(row) : acc[1].push(row);
      return acc;
    },
    [[], []],
  );
};
