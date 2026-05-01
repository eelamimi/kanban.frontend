import Select from 'react-select'
import { useState, useCallback, useMemo, memo } from 'react'

const getBaseStyles = (hasError) => ({
    control: (base, state) => ({
        ...base,
        border: hasError ? '1px solid red' : '1px solid black',
        boxShadow: 'none',
        minHeight: '36px',
        height: '36px',
        maxHeight: '36px',
        outline: hasError ? '1px solid red' : state.isFocused ? '1px solid black' : 'none',
        backgroundColor: 'white',
        '&:hover': {
            borderColor: 'none'
        },
    }),
    input: () => ({
        color: 'black',
        width: '100%',
        display: 'inline-block',
        flex: '1 1 auto',
    }),
    singleValue: () => ({
        color: 'black',
        whiteSpace: 'nowrap',
        fontWeight: '200',
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 8px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    }),
    indicatorsContainer: () => ({
        height: '36px',
    }),
    menu: () => ({
        border: '1px solid black',
        borderRadius: '4px',
        outline: '1px solid black',
        marginTop: '4px',
        position: 'absolute',
        zIndex: 3,
        backgroundColor: 'white',
        width: '100%',
    }),
    menuList: () => ({
        padding: '0',
        fontWeight: '200',
    }),
    option: (base, state) => ({
        ...base,
        padding: '.5rem 1rem',
        backgroundColor: state.isSelected ? 'dimgray' : 'transparent',
        '&:first-of-type': {
            borderRadius: '4px 4px 0 0',
        },
        '&:last-child': {
            borderRadius: '0 0 4px 4px',
        },
        '&:hover': {
            backgroundColor: state.isSelected ? 'gray' : 'lightgray',
        },
    }),
    placeholder: () => ({
        display: 'none',
    })
})

const SelectField = ({
    id,
    options,
    value,
    onChange,
    fieldClassName = '',
    placeholder = 'Выберите...',
    error,
    withImg = false,
    isForEditUserRolesSection = false,
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = !!value

    const styles = useMemo(() => getBaseStyles(!!error), [error])

    const handleChange = useCallback((selected) => onChange(selected), [onChange])
    const handleFocus = useCallback(() => setIsFocused(true), [])
    const handleBlur = useCallback(() => setIsFocused(false), [])

    const labelStyle = useMemo(() => ({
        position: 'absolute',
        left: (isFocused || hasValue) ? '9px' : '10px',
        top: (isFocused || hasValue) ? '-8px' : '10px',
        fontSize: (isFocused || hasValue) ? '13px' : undefined,
        padding: (isFocused || hasValue) ? '0px 3px' : undefined,
        backgroundColor: (isFocused || hasValue) ? 'white' : undefined,
        transition: 'all 0.3s ease',
        color: 'hsl(0, 0%, 50%)',
        pointerEvents: 'none',
        zIndex: 2,
    }), [isFocused, hasValue])

    const formatOptionLabel = useCallback((option) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {withImg && (
                    <img
                        className={option.imgClassName}
                        src={option.img}
                        alt={option.label}
                    />
                )}
                <span>{option.label}</span>
            </div>
        )
    }, [withImg])

    return (
        <div className={`field ${fieldClassName}`} style={{
            flex: isForEditUserRolesSection ? '1 1 100%' : 1,
            position: 'relative',
            width: isForEditUserRolesSection ? '100%' : 'auto'
        }}>
            <Select
                id={id}
                styles={styles}
                options={options}
                value={value}
                onChange={handleChange}
                placeholder=''
                onFocus={handleFocus}
                onBlur={handleBlur}
                formatOptionLabel={formatOptionLabel}
            />
            <label className='field__label' style={labelStyle}>
                {placeholder}
            </label>
            {error && (
                <span className='field__error' style={{ marginTop: '3px' }} title={error}>
                    {error}
                </span>
            )}
        </div>
    )
}

export default memo(SelectField)