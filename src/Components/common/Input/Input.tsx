import React from "react";
import "./Input.scss";

interface InputProps {
  id?: string;
  type: "checkbox" | "radio";
  className?: string;
  name?: string;
  label?: string;
  labelRight?: boolean;
  disabled?: boolean;
  checked?: boolean;
  onClick?: any;
  htmlFor?: string;
  autoComplete?: "on" | "off";
}

const Input: React.FunctionComponent<InputProps> = (
  {id, type, name, className, label, labelRight, disabled, checked, onClick, htmlFor,autoComplete}
): React.ReactElement => {


  return (
    <label htmlFor={htmlFor} className={`container${type === "checkbox" ? "-square" : ""}`}>
      {!labelRight && label}
      <input
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        onClick={() =>
          onClick()
        }
        autoComplete={autoComplete}
      />
      {labelRight && <span className="label-right">{label}</span>}
      <span className={`checkmark${type === "checkbox" ? "-square" : ""}`}></span>
    </label>
  )
};

export default Input;
