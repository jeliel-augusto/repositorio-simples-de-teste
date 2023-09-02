import { useCallback, useState } from "react";
import { Input } from "../../input/input";
import { Button } from "../../button";
import { Dropdown } from "../../dropdown";

export interface CrudDataProperty {
  name: string;
  property: string;
}
interface CrudSearchProps {
  fieldsToSearch: CrudDataProperty[];
  onSearch: (field: string, value: string) => any;
}
export const CrudSearch: React.FC<CrudSearchProps> = ({
  onSearch,
  fieldsToSearch,
}) => {
  const [selectedOption, setSelectedOption] = useState(fieldsToSearch[0]);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [propertyValue, setPropertyValue] = useState(
    fieldsToSearch[0].property
  );

  const onChangeOptionDropdown = useCallback((property: string) => {
    setPropertyValue(property);
  }, []);
  return (
    <div className="flex flex-1 my-4 items-end">
      <div className="flex-1">
        <Dropdown
          label="Campos"
          selectedOption={selectedOption}
          onChangeOption={onChangeOptionDropdown}
          options={fieldsToSearch}
        />
      </div>
      <div className="flex-1">
        <Input
          label="Descrição"
          value={descriptionValue}
          onChange={setDescriptionValue}
        />
      </div>
      <div className="justify-end flex mr-4">
        <Button onClick={() => onSearch(propertyValue, descriptionValue)}>
          Pesquisar
        </Button>
      </div>
    </div>
  );
};
