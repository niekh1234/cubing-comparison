import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Table } from '../types';
import { createTableSeed, updateTable } from '../utils/table';

interface State {
  time: string;
  setTime: (time: string) => void;
  event: string;
  setEvent: (event: string) => void;
  table: Table;
  showSideEvents: Boolean;
  setShowSideEvents: (showSideEvents: Boolean) => void;
  setTable: (table: Table) => void;
  updateRow: (targetTime: string, eventKey: string) => void;
  reset: () => void;
}

const useStore = create(
  persist<State>((set, get) => ({
    time: '',
    setTime: (time) => {
      set({ time });
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
    table: createTableSeed(),
    showSideEvents: false,
    setShowSideEvents: (showSideEvents) => {
      set({ showSideEvents });
    },
    setTable: (table: Table) => set({ table }),
    updateRow(time: string, eventKey: string) {
      set({
        table: updateTable(time, eventKey, get().table),
      });
    },
    reset() {
      set({ table: createTableSeed() });
    },
  })),
);

export default useStore;
