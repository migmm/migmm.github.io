import React from "react";


interface Props {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
}

const Checkbox = (props: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={props.id}
        checked={props.isChecked}
        onChange={props.handleChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default Checkbox;


