import React, { useState } from "react";

const formatNumberWithDots = (value) => {
  // Elimina cualquier carácter que no sea un número
  const numericValue = value.replace(/\D/g, "");
  // Formatea el número con puntos como separadores de miles
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const LabelInput = ({ type, name, title, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    let value = e.target.value;

    if (type === "number") {
      // Permitir solo dígitos y aplicar el formato con separadores de miles
      value = formatNumberWithDots(value);
    }

    setInputValue(value);

    if (onChange) onChange(e);
  };

  return (
    <label
      htmlFor={name}
      className="relative block rounded-md border-2 p-1 border-gray-200 bg-white shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type= {type} // Usar type="text" para manejar los valores de entrada como texto formateado
        id={name}
        name={name}
        value={`${title == "Amount" ? "$" + inputValue: inputValue}`}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={title}
        onChange={handleChange}
        autoComplete="off"
      />
      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#C4DFFE] p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 
      peer-placeholder-shown:text-xl peer-placeholder-shown:bg-transparent peer-focus:top-0 peer-focus:text-xs peer-focus:bg-[#C4DFFE] rounded">
        {title}
      </span>
    </label>
  );
};

export default LabelInput;
