import useStore from '../../store';
import { divideTableByRowType } from '../../utils/table';
import TableRow from './Row';

const Table = () => {
  const { table, showSideEvents, updateRow } = useStore();

  const [nxn, side] = divideTableByRowType(table, showSideEvents);

  return (
    <section className='mt-8 overflow-hidden rounded-lg shadow-xl md:mt-16'>
      <table className='w-full text-sm table-auto md:text-base'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='py-3 pl-4 text-left text-gray-800 md:pl-6'>Event</th>
            <th className='hidden py-3 text-left text-gray-800 whitespace-nowrap md:table-cell'>
              Top ao1000
            </th>
            <th className='py-3 text-left text-gray-800'>Ideal averages</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-100'>
          {nxn.map((row) => (
            <TableRow row={row}></TableRow>
          ))}

          {showSideEvents && (
            <tr className='bg-gray-50'>
              <td className='py-3 pl-4 font-bold text-gray-800 md:pl-6'>Side events</td>
              <td></td>
              <td></td>
            </tr>
          )}

          {side.map((row) => (
            <TableRow row={row}></TableRow>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
