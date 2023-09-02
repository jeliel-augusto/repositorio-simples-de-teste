interface TableHeaderProps {
  columns: string[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr className="bg-main-black   text-white rounded-tl-lg rounded-tr-lg">
        {columns.map((column) => (
          <th key={column} className="text-start p-3">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
