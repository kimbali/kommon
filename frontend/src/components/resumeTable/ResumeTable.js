import React from 'react';
import Text from '../text/Text';

function ResumeTable({ list = [] }) {
  return (
    <table className='resume-table'>
      <tbody>
        {list.map((eachItem, index) => (
          <tr key={`table-${index}`}>
            <th>
              <Text isBold>{eachItem.name}</Text>
            </th>

            <td>
              <Text isBold={eachItem.isBold} isCurrency={eachItem.isCurrency}>
                {eachItem.value}
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResumeTable;
