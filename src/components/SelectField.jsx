import Select from 'react-select'
import { useState } from 'react'

const SelectField = ({ id, options, value, onChange, placeholder = 'Выберите...' }) => {
    const [isFocused, setIsFocused] = useState(false)
    const selectedOption = options.find(option => option.value === value)
    const hasValue = !!value

    const styles = {
        control: (base, state) => ({
            ...base,
            border: '1px solid black',
            boxShadow: 'none',
            minHeight: '36px',
            height: '36px',
            maxHeight: '36px',
            outline: state.isFocused ? '1px solid black' : 'none',
            '&:hover': {
                borderColor: 'none'
            },
        }),
        input: (base, state) => ({
            ...base,
            color: 'black',
        }),
        singleValue: (base, state) => ({
            ...base,
            color: 'black',
        }),
        menu: (base, state) => ({
            border: '1px solid black',
            borderRadius: '4px',
            outline: '1px solid black',
        }),
        menuList: (base, state) => ({
            padding: '0',
        }),
        option: (base, state) => ({
            ...base,
            padding: '.5rem 1rem',
            backgroundColor: state.isSelected ? 'dimgray' : 'transparent',
            '&:hover': {
                backgroundColor: state.isSelected ? 'gray' : 'lightgray',
            },
        }),
        placeholder: (base, state) => ({
            ...base,
            display: 'none',
        })
    }

    return (
        <div className="field" style={{ position: 'relative' }}>
            <Select
                id={id}
                styles={styles}
                options={options}
                value={selectedOption}
                onChange={(selected) => onChange(selected?.value || '')}
                placeholder=""
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <label
                className="field__label"
                style={{
                    top: (isFocused || hasValue) ? '-8px' : '10px',
                    left: (isFocused || hasValue) ? '9px' : '10px',
                    fontSize: (isFocused || hasValue) ? '13px' : undefined,
                    padding: (isFocused || hasValue) ? '0px 3px' : undefined,
                    backgroundColor: (isFocused || hasValue) ? 'white' : undefined,
                }}
            >
                {placeholder}
            </label>
        </div>
    )
}

export default SelectField