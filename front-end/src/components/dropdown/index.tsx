import { CrudDataProperty } from "../crud/search/CrudSearch";

interface DropdownProps {
  label: string;
  options: CrudDataProperty[];
  value?: string;
  selectedOption?: CrudDataProperty;
  onChangeOption: (property: string) => any;
}
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  value,
  onChangeOption,
}) => {
  return (
    <div className="  mx-2 flex flex-col">
      <label className="font-bold text-lg my-1">{label}</label>
      <select
        className="bg-white rounded-lg flex-1  border-2 p-3"
        onChange={(event) => onChangeOption(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option value={option.property} key={option.property}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
