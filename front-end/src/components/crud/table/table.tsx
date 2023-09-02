import { TableBody } from "./body";
import { TableHeader } from "./header";
import { TableRowsData } from "./row";

interface TableProps {
  columns: string[];
  onEdit: () => {};
  onDelete: (id: string) => {};
  rows: TableRowsData;
}
export const Table: React.FC<TableProps> = ({
  columns,
  onEdit,
  onDelete,
  rows,
}) => {
  return (
    <table className="bg-white overflow-hidden w-full rounded-lg border-collapse shadow-lg">
      <TableHeader columns={columns} />
      <TableBody onDelete={onDelete} onEdit={onEdit} rows={rows} />
    </table>
  );
};
