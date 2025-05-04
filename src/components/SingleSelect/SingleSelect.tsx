import React, { useState, useRef, useEffect } from "react";
import styles from "./SingleSelect.module.scss";

type SingleSelectProps = {
    options: string[];
    value: string | null;
    onChange: (selected: string) => void;
    placeholder?: string;
};

const SingleSelect: React.FC<SingleSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select...",
}) => {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleSelect = (item: string) => {
        onChange(item);
        setInputValue(item);
        setIsOpen(false);
    };

    const handleAddNew = () => {
        const trimmed = inputValue.trim();
        if (trimmed) {
            onChange(trimmed);
            setInputValue(trimmed);
            setIsOpen(false);
        }
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

    useEffect(() => {
        if (!value) setInputValue("");
    }, [value]);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={styles.input}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(true);
                    }}
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
                                className={`${styles.option} ${value === opt ? styles.selected : ""
                                    }`}
                                onClick={() => handleSelect(opt)}
                            >
                                {opt}
                                {value === opt && <span className={styles.check}>✔️</span>}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleSelect;