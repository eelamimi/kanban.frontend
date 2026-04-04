import { useState } from 'react'
import Modal from './Modal'
import Field from './Field'
import SelectField from './SelectField'
import CustomSelect from './CustomSelect'

function AddIssueModal({ isOpen, onClose }) {
    const [issueTitle, setIssueTitle] = useState('')

    const onIssueTitleInput = ({ target }) => {
        const { value } = target
        setIssueTitle(value)
    }

    const addTask = async () => {
        console.log('onAction addTask modal')
    }
    const [country, setCountry] = useState('');
    const countryOptions = [
        { value: 'russia', label: 'Россия' },
        { value: 'usa', label: 'США' },
        { value: 'uk', label: 'Великобритания' },
        { value: 'germany', label: 'Германия' }
    ];

    // CustomSelect
    return (
        <Modal
            isOpen={isOpen}
            title={'Создать задачу'}
            actionTitle={'Создать'}
            onAction={addTask}
            onClose={onClose}
        >
            <Field
                id='issueTitle'
                inputClassName='full-width'
                type='text'
                label='Название задачи'
                value={issueTitle}
                onInput={onIssueTitleInput}
                required
            />

            <CustomSelect
                id="country"
                label="Страна"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                options={countryOptions}
            />
        </Modal>
    )
}

export default AddIssueModal