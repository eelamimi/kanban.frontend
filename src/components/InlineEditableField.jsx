import { useCallback } from 'react'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Field from './Field'
import Button from './Button'
import Section from './Section'

const InlineEditableField = ({
    id,
    value,
    onChange,
    onDelete,
    error,
    isEditing,
    onEditToggle,
    isWaitingEdit,
    isWaitingDelete,
    isDeleteDisabled,
    className = 'column-position'
}) => {
    const handleInput = useCallback(({ target }) => {
        onChange(target.value)
    }, [onChange])

    return (
        <div className='row' style={{ gap: '6px' }}>
            <Section className={`${className} ${isEditing ? 'editing-column-name' : ''}`}>
                {isEditing
                    ? <Field
                        id={id}
                        fieldClassName='column-name-edit'
                        type='text'
                        value={value}
                        onInput={handleInput}
                        error={error}
                    />
                    : value
                }
            </Section>
            <Button
                className='column-button-action'
                onClick={onEditToggle}
                isDisabled={isWaitingEdit}
            >
                {isEditing
                    ? <FontAwesomeIcon icon={faCheck} />
                    : <FontAwesomeIcon icon={faPenToSquare} />
                }
            </Button>
            <Button
                className='close column-button-action'
                onClick={onDelete}
                isDisabled={isWaitingDelete || isDeleteDisabled}
            >
                <FontAwesomeIcon icon={faX} />
            </Button>
        </div>
    )
}

export default InlineEditableField
