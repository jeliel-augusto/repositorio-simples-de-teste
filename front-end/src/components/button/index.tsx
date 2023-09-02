import { PropsWithChildren } from "react";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  className,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={`p-3 ${
        className?.includes("bg") ? "" : "bg-blue-400"
      } text-white rounded-lg shadow-md text-xl ${className} disabled:opacity-50`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
