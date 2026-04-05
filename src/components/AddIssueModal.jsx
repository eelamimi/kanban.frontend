import { useState } from 'react'
import Modal from './Modal'
import Field from './Field'
import SelectField from './SelectField'
import AuthService from '../service/AuthService'

const issueTypeOptions = [
    { value: 'Bug', label: 'Баг' },
    { value: 'Story', label: 'История' },
    { value: 'Task', label: 'Задача' },
    { value: 'Investigation', label: 'Расследование' }
]
const issuePriorityOptions = [
    { value: 'Minimal', label: 'Минимальный' },
    { value: 'Low', label: 'Низкий' },
    { value: 'Medium', label: 'Средний' },
    { value: 'High', label: 'Высокий' },
    { value: 'Critical', label: 'Критический' }
]

function AddIssueModal({ members, isOpen, onClose }) {
    const [issueTitle, setIssueTitle] = useState('')
    const [assigneeId, setAssigneeId] = useState('')
    const [authorId, setAuthorId] = useState(AuthService.getUserInfo().userProfileId)
    const [issueDescription, setIssueDescription] = useState('')
    const [issueType, setIssueType] = useState('')
    const [issuePriority, setIssuePriority] = useState('')

    const memberIdOptions = members.map((member) => ({
        value: member.id, label: `${member.firstName} ${member.secondName}`
    }))

    const onIssueTitleInput = ({ target }) => {
        const { value } = target
        setIssueTitle(value)
    }

    const onIssueDescriptionInput = ({ target }) => {
        const { value } = target
        setIssueDescription(value)
    }

    const addIssue = async () => {
        console.log('onAction addTask modal')
    }

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
                label='Название'
                value={issueTitle}
                onInput={onIssueTitleInput}
                required
            />
            <div className='row' style={{ gap: '25px' }}>
                <SelectField
                    placeholder='Исполнитель'
                    value={assigneeId}
                    onChange={setAssigneeId}
                    options={memberIdOptions}
                />
                <SelectField
                    placeholder='Автор'
                    value={authorId}
                    onChange={setAuthorId}
                    options={memberIdOptions}
                />
            </div>
            <div className='row' style={{ gap: '25px' }}>
                <SelectField
                    placeholder='Тип'
                    value={issueType}
                    onChange={setIssueType}
                    options={issueTypeOptions}
                />
                <SelectField
                    placeholder='Приоритет'
                    value={issuePriority}
                    onChange={setIssuePriority}
                    options={issuePriorityOptions}
                />
            </div>
            <Field
                id='issueDescription'
                inputClassName='full-width'
                type='text'
                label='Описание'
                value={issueDescription}
                onInput={onIssueDescriptionInput}
                required
            />
        </Modal>
    )
}

export default AddIssueModal