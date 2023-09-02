import ReactModal from "react-modal";
import { Button } from "../button";
ReactModal.setAppElement("#modals-container");
export const ConfirmDelete = ({
  isOpen,
  closeModal,
  onYes,
}: {
  isOpen: boolean;
  onYes: () => void;
  closeModal: () => void;
}) => {
  return (
    <ReactModal
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      isOpen={isOpen}
    >
      <div className="w-full h-full flex flex-col">
        <h1 className="text-xl font-bold">
          Deseja deletar realmente esse registro?
        </h1>
        <div className="flex flex-1 ">
          <Button className="flex-1 mr-2 mt-2" onClick={onYes}>
            Sim
          </Button>
          <Button className="flex-1  mt-2 bg-red-500" onClick={closeModal}>
            Não
          </Button>
        </div>
      </div>
    </ReactModal>
  );
};
