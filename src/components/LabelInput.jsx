import React, { useState } from "react";

const formatNumber = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const formatPhone = (value) => value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const validatePassword = (value) => {
  // La expresión regular revisa que la contraseña tenga al menos una letra minúscula, una letra mayúscula, un número, un carácter especial, y que tenga 8 caracteres o más
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
  return passwordRegex.test(value);
};

const formatDate = (value) => {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
};

const LabelInput = ({ type, name, title, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    let value = e.target.value;

    switch (type) {
      case "number":
        value = formatNumber(value.replace(/\D/g, ""));
        break;
      case "tel":
        value = formatPhone(value.replace(/\D/g, "").slice(0, 10));
        break;
      case "date":
        value = formatDate(value);
        break;
      case "email":
        if (!validateEmail(value)) {
          // Mostrar error de validación si es necesario
        }
        break;
      default:
        break;
    }

    setInputValue(value);
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    if (type === "password" && !validatePassword(inputValue)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un signo especial.");
      // Mantén el valor en lugar de borrarlo, para que el usuario pueda corregirlo
    }
  };

  return (
    <label
      htmlFor={name}
      className="relative block rounded-md border-2 p-1 border-gray-200 bg-white shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type={type}
        id={name}
        name={name}
        value={inputValue}
        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={title}
        onChange={handleChange}
        onBlur={handleBlur} // Valida la contraseña cuando el campo pierde el foco
        autoComplete="off"
      />
      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#C4DFFE] p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 
      peer-placeholder-shown:text-xl peer-placeholder-shown:bg-transparent peer-focus:top-0 peer-focus:text-xs peer-focus:bg-[#C4DFFE] peer-focus:rounded-xl">
        {title}
      </span>
    </label>
  );
};

export default LabelInput;
