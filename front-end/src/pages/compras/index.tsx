import { useCallback, useContext, useEffect, useState } from "react";
import { HeaderContext } from "../../context/HeaderContext";
import { CrudDataProperty } from "../../components/crud/search/CrudSearch";
import { Compra } from "../../models/Compra";
import { TableRowsData } from "../../components/crud/table/row";
import { CompraAPI } from "../../api/compraAPI";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { GamesAPI } from "../../api/gamesAPI";
import { ConfirmDelete } from "../../components/dialogs/ConfirmDelete";
import { Table } from "../../components/crud/table/table";
import Link from "next/link";
import { Button } from "../../components/button";
import { formatDateTime } from "../../utils/formatDateTime";
import { formatItemCompraToHTML } from "../../utils/formatItemCompraToHTML";
import { parseCookies } from "nookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AuthContext } from "../../context/AuthContext";
const columns = ["ID", "Data Hora", "Itens Comprados", "Ação"];

const fieldsToSearch: CrudDataProperty[] = [
  {
    name: "ID",
    property: "id",
  },
  {
    name: "Data Hora",
    property: "dthr",
  },
  {
    name: "Itens Comprados",
    property: "itensCompra",
  },
];
export default function ComprasPage() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [gamesTableRowsData, setGamesTableRowsData] = useState<TableRowsData>(
    []
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const onEdit = useCallback(async () => {}, []);
  const onDelete = useCallback(async (id: string) => {
    setIdToDelete(+id);
    setShowConfirmDelete(true);
  }, []);
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setHeaderTitle } = useContext(HeaderContext);
  useEffect(() => {
    setHeaderTitle("Compras");
    setIsAuthenticated(true);
  }, [setHeaderTitle, setIsAuthenticated]);

  const fetchCompras = useCallback(async () => {
    try {
      const listOfCompras = await CompraAPI.getCompras();
      console.log(listOfCompras);
      setCompras(listOfCompras);
    } catch (e) {
      console.error(e);
    }
  }, []);
  const onConfirmDelete = useCallback(async () => {
    try {
      await CompraAPI.delete(idToDelete);
      toast("Compra deletada com sucesso.", {
        type: "success",
      });
    } catch (e) {
      const error = ((e as AxiosError).response?.data as any)?.message;
      if (error) {
        toast("Compra falhou ao deletar. Erro: " + error, {
          type: "error",
        });
      }
    }
    setShowConfirmDelete(false);
    fetchCompras();
  }, [fetchCompras, idToDelete]);
  useEffect(() => {
    fetchCompras(); // initialize component with first render
  }, [fetchCompras]);
  useEffect(() => {
    const tableRowsData: TableRowsData = [];
    for (const compra of compras) {
      tableRowsData.push({
        id: compra.id.toString(),
        cells: [
          {
            data: compra.id.toString(),
            type: "string",
            size: 1,
          },
          {
            data: formatDateTime(compra.dthr),
            type: "string",
            size: 1,
          },
          {
            data: compra.itensCompra?.length
              ? compra.itensCompra
                  .map((itemCompra) => formatItemCompraToHTML(itemCompra))
                  .join(",")
              : "Não consta.",
            type: "html",
            size: 4,
          },
        ],
      });
    }
    setGamesTableRowsData(tableRowsData);
  }, [compras]);
  return (
    <div className="w-full">
      <ConfirmDelete
        isOpen={showConfirmDelete}
        closeModal={() => setShowConfirmDelete(false)}
        onYes={onConfirmDelete}
      />
      <Table
        columns={columns}
        onDelete={onDelete}
        onEdit={onEdit}
        rows={gamesTableRowsData}
      />
      <div className="flex justify-end flex-1 my-4">
        <Link href={"/compras/add"}>
          <Button className="mr-1">Novo</Button>
        </Link>
        <Link href="/games">
          <Button className="mr-1">Cancelar</Button>
        </Link>
      </div>
    </div>
  );
}

// server-side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["token"];
  console.log(`cookie token: ${token}`);
  if (!token) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
