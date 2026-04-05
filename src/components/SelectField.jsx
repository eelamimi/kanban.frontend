import Select from 'react-select'

const SelectField = ({ id, options, value, onChange, placeholder = 'Выберите...' }) => {
    const selectedOption = options.find(option => option.value === value)

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
        // .field__label {
        //             position: absolute;
        //     left: 10px;
        //     top: 10px;
        //     transition: all 0.3s ease;
        //     color: hsl(0, 0 %, 50 %);
        //     pointer - events: none;
        // }
        // .field__input: focus +.field__label,
        // .field__input: not(: placeholder - shown) +.field__label {
        //     top: -8px;
        //     left: 9px;
        //     font - size: 13px;
        //     padding: 0px 3px;
        //     background - color: white;
        // }

        placeholder: (base, state) => ({
            ...base,
            position: 'absolute',
            transition: 'all 0.3s ease',

            // '&:focus'
        })
    }

    return (
        <div className={`field`}>
            <Select
                id={id}
                styles={styles}
                options={options}
                value={selectedOption}
                onChange={(selected) => onChange(selected?.value || '')}
                placeholder={placeholder}
            />
        </div>
    )
}

export default SelectField