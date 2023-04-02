import useStore from '../../store';
import TableRow from './Row';

const Table = () => {
  const { table } = useStore();

  if (!table?.rows) {
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-8 h-8 border-2 border-indigo-500 rounded-full animate-spin"></div>
        <div className="mt-2 text-sm text-gray-700">One second, loading latest records...</div>
      </div>
    );
  }

  const { rows } = table;

  return (
    <section className="mt-8 overflow-hidden rounded-lg shadow-xl md:mt-16">
      <table className="w-full text-sm table-auto md:text-base">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 pl-4 text-left text-gray-800 md:pl-6">Event</th>
            <th className="hidden py-3 text-left text-gray-800 whitespace-nowrap md:table-cell">
              Top ao5
            </th>
            <th className="py-3 text-left text-gray-800">Ideal averages</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((row) => (
            <TableRow key={row.key} row={row}></TableRow>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
