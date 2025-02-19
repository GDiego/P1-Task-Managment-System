import React from 'react';

export const Table = ({ children }) => (
  <table className="table">
    {children}
  </table>
);

export const TableHeader = ({ children }) => (
  <thead className="table-header">
    {children}
  </thead>
);

export const TableRow = ({ children }) => (
  <tr className="table-row">
    {children}
  </tr>
);

export const TableHead = ({ children }) => (
  <th className="table-head">
    {children}
  </th>
);

export const TableBody = ({ children }) => (
  <tbody className="table-body">
    {children}
  </tbody>
);

export const TableCell = ({ children }) => (
  <td className="table-cell">
    {children}
  </td>
);