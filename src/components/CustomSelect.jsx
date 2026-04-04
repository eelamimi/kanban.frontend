import { useState, useRef, useEffect } from 'react';
// import './CustomSelect.css';

const CustomSelect = ({ options, value, onChange, placeholder = 'Выберите...' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        options.find(opt => opt.value === value) || null
    );
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onChange({ target: { value: option.value } });
        setIsOpen(false);
    };

    return (
        <div className="custom-select" ref={selectRef}>
            <div
                className={`custom-select__trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="custom-select__value">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className="custom-select__arrow"></span>
            </div>

            {isOpen && (
                <div className="custom-select__dropdown">
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={`custom-select__option ${selectedOption?.value === option.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect