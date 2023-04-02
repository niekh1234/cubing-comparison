import { getTimeInSeconds, getTimeString } from './parse-time';
import { Table, TableRow } from '../types';

export const getRecordAverages = async () => {
  try {
    const response = await fetch('https://wca-proxy.niekh.com/api/v1/records');
    const { records } = await response.json();

    return records.map((record: any) => ({
      key: record.slug,
      event: record.event,
      average: getTimeInSeconds(record?.records?.average?.n || record?.records?.single?.n || 0),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTableSeed = async () => {
  const records = await getRecordAverages();

  return {
    rows: records.map((record: any) => ({
      ...record,
      target: 0,
    })),
  };
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
