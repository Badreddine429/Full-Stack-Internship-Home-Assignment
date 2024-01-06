// src/components/ResultsTable.js
import React from 'react';
import { useTable, usePagination } from 'react-table';

const ResultsTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable({ columns, data }, usePagination);

  return (
    <div>
      <br></br>
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            const rowProps = row.getRowProps ? row.getRowProps() : {};
            return (
              <tr key={i} {...rowProps}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page.length ? page[0].index + 1 : 0} of {page.length}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultsTable;
