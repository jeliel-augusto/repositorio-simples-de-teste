import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  label: string;
  value: any;
  type?: HTMLInputTypeAttribute;
  onChange: (text: string) => any;
}
export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type,
}) => {
  return (
    <div className=" mx-2 w-[calc(100%-16px)] flex flex-col">
      <label className="font-bold text-lg my-1">{label}</label>
      <input
        type={type ? type : "text"}
        className="bg-white rounded-lg  border-2 p-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
