import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Table } from '../types';
import { createTableSeed, getRecordAverages, updateTable } from '../utils/table';

interface State {
  time: string;
  setTime: (time: string) => void;
  event: string;
  setEvent: (event: string) => void;
  table: Table;
  setTable: (table: Table) => void;
  updateRow: (targetTime: string, eventKey: string) => void;
  reset: () => void;
  updateRecords: () => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

const useStore = create(
  persist<State>((set, get) => ({
    time: '',
    setTime: (time) => {
      set({ time });
      console.log(get());

      if (get().event) {
        set({
          table: updateTable(time, get().event, get().table),
        });
      }
    },
    event: '3x3',
    setEvent: (event) => {
      set({ event });
      if (get().time) {
        set({
          table: updateTable(get().time, event, get().table),
        });
      }
    },
    table: [] as any as Table,
    setTable: (table: Table) => set({ table }),
    updateRow(time: string, eventKey: string) {
      set({
        table: updateTable(time, eventKey, get().table),
      });
    },
    reset() {
      createTableSeed().then((table) => set({ table }));
    },
    updateRecords() {
      const { table } = get();

      getRecordAverages().then((records) => {
        set({
          table: {
            rows: records
              .filter((record: any) => record.key !== '3x3x3-multiblind')
              .map((record: any) => ({
                ...record,
                target: table.rows.find((row) => row.key === record.key)?.target || 0,
              })),
          },
        });
      });
    },
    loaded: false,
    setLoaded: (loaded) => set({ loaded }),
  }))
);

export default useStore;
