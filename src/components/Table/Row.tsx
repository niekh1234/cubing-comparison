import useStore from '../../store';
import { TableRow as TableRowType } from '../../types';
import { getTimeString } from '../../utils/parse-time';

interface TableRowProps {
  row: TableRowType;
}

const TableRow = ({ row }: TableRowProps) => {
  const { updateRow } = useStore();

  return (
    <tr key={row.key} className='p-2'>
      <td className='py-4 pl-4 pr-4 text-gray-700 md:pl-6 whitespace-nowrap'>
        <strong>{row.event}</strong>
        <span className='table-cell text-xs text-gray-500 md:hidden'>Top: {row.average}</span>
      </td>
      <td className='hidden text-gray-500 md:table-cell'>{getTimeString(row.average)}</td>
      <td className='pr-4'>
        <input
          value={row.target}
          onChange={(e) => updateRow(e.target.value, row.key)}
          className='w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
        ></input>
      </td>
    </tr>
  );
};

export default TableRow;
