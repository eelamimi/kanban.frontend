import { useState } from 'react'
import Modal from './Modal'
import Field from './Field'

function AddIssueModal({ isOpen, onClose }) {
    const [issueTitle, setIssueTitle] = useState('')

    const onIssueTitleInput = ({ target }) => {
        const { value } = target
        // const clearValue = value.trim()
        // const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setIssueTitle(value)
        // setPasswordError(hasOnlySpaces ? 'Пароль обязателен для заполнения' : '')
    }


    const addTask = async () => {
        console.log('onAction addTask modal')
    }

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
                type='text'
                label='Название задачи'
                value={issueTitle}
                onInput={onIssueTitleInput}
                // error={passwordError}
                // autoComplete='current-password'
                required
            />
        </Modal>
    )
}

export default AddIssueModal