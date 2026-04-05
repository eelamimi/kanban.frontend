import { useState } from 'react'
import Modal from './Modal'
import Field from './Field'
import SelectField from './SelectField'

function AddIssueModal({ isOpen, onClose }) {
    const [issueTitle, setIssueTitle] = useState('')
    const [issueType, setIssueType] = useState('');

    const onIssueTitleInput = ({ target }) => {
        const { value } = target
        setIssueTitle(value)
    }

    const addIssue = async () => {
        console.log('onAction addTask modal')
    }

    const issueTypeOptions = [
        { value: 'Bug', label: 'Баг' },
        { value: 'Story', label: 'История' },
        { value: 'Task', label: 'Задача' },
        { value: 'Investigation', label: 'Расследование' }
    ];

    return (
        <Modal
            isOpen={isOpen}
            title={'Создать проблему'}
            actionTitle={'Создать'}
            onAction={addIssue}
            onClose={onClose}
        >
            <Field
                id='issueTitle'
                inputClassName='full-width'
                type='text'
                label='Название проблемы'
                value={issueTitle}
                onInput={onIssueTitleInput}
                required
            />
            {/* <div className="row"> */}
            {/* <div className='row'> */}
            <SelectField
                placeholder="Тип проблемы"
                value={issueType}
                onChange={setIssueType}
                options={issueTypeOptions}
            />
            <SelectField
                placeholder="Тип проблемы"
                value={issueType}
                onChange={setIssueType}
                options={issueTypeOptions}
            />
            {/* </div> */}
            {/* </div> */}
        </Modal>
    )
}

export default AddIssueModal