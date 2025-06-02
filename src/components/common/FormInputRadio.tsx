import React from "react";

interface FormInputRadio {
  option: string;
  key?: string;
}

const FormInputRadio = ({ option }: FormInputRadio) => {
  return (
    <label className="flex cursor-pointer">
      <input name="radio" type="radio" />
      <span className="w-80">{option}</span>
    </label>
  );
};

export default FormInputRadio;
