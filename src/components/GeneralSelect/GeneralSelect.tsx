
// type Props = {
//     options: { value: string, label: string }[]
// }

// const GeneralSelect = (props: Props) => {
//     const {
//         options
//     } = props
//     return (
//         <select className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         >
//             {options.map(q => (
//                 <option value={q.value}>{q.label}</option>
//             ))}
//         </select>
//     )
// }
// export default GeneralSelect;

import React, { useState, useRef, useEffect } from "react";
import styles from "./GeneralSelect.module.scss";

type GeneralSelectProps = {
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

const GeneralSelect: React.FC<GeneralSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (opt) =>
      opt.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(opt)
  );

  const handleSelect = (item: string) => {
    if (!value.includes(item)) {
      onChange([...value, item]);
    }
    setInputValue("");
  };

  const handleAddNew = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNew();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.input}
          onClick={(e) => e.stopPropagation()}
        />
        <span className={styles.arrow}>{isOpen ? "▴" : "▾"}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {filteredOptions.length === 0 && inputValue ? (
            <div
              className={styles.option}
              onClick={() => handleAddNew()}
            >
              Add "{inputValue}"
            </div>
          ) : (
            filteredOptions.map((opt) => (
              <div
                key={opt}
                className={`${styles.option} ${
                  value.includes(opt) ? styles.selected : ""
                }`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
                {value.includes(opt) && <span className={styles.check}>✔️</span>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GeneralSelect;