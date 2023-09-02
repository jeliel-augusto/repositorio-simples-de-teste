import Link from "next/link";
import { useRouter } from "next/router";
import { MdEdit, MdDelete } from "react-icons/md";
export type TableRowsData = Array<{ id: string; cells: Cell[] }>;
interface Cell {
  type: "img" | "string" | "html";
  data: string;
  size: number;
}
interface TableRowProps {
  onEdit: () => {};
  onDelete: (id: string) => {};
  rows: TableRowsData;
}
export const TableRows: React.FC<TableRowProps> = ({ rows, onDelete }) => {
  const router = useRouter();
  return rows.map((row) => (
    <tr key={row.id}>
      {row.cells.map((cell, index) => (
        <td key={`${row.id}-${index}`} className={`p-3 w-${cell.size}/12 `}>
          {cell.type === "string" && cell.data}
          {cell.type === "img" && (
            <img src={cell.data} className="w-full max-w-[220px]" />
          )}
          {cell.type === "html" && (
            <div
              className="flex w-full flex-row flex-wrap "
              dangerouslySetInnerHTML={{ __html: cell.data }}
            ></div>
          )}
        </td>
      ))}
      <td className="w-1/12 p-3">
        <Link href={router.pathname + "/edit/" + row.id}>
          <button className="text-2xl text-orange-400">
            <MdEdit />
          </button>
        </Link>
        <button
          className="text-2xl text-red-500"
          onClick={() => onDelete(row.id)}
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  ));
};
