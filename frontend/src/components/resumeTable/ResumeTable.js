import React from 'react';
import Text from '../text/Text';

function ResumeTable({ list = [], withBullets = false }) {
  return (
    <table className='resume-table'>
      <tbody>
        {list.map((eachItem, index) => {
          if (Object.keys(eachItem).length === 0) {
            return null;
          }

          return (
            <tr
              key={`table-${index}`}
              className={withBullets ? 'with-bullets' : ''}
            >
              <th>
                <Text isBold>{eachItem.name || ''}</Text>
              </th>

              <td>
                <Text isBold={eachItem.isBold}>{eachItem.value || ''}</Text>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ResumeTable;
