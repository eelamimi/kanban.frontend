import { useContext } from 'react'
import { IssueContext } from '../../context/Issue/IssueContext'
import { useAddCommentary } from '../../hook/useAddCommentary'
import Section from '../Section'
import TextareaField from '../TextareaField'
import IssueCommentary from './IssueCommentary'
import Button from '../Button'
import FileAttachmentField from '../FileAttachmentField'

const IssueCommentaries = () => {
    const { issue, addCommentary } = useContext(IssueContext)
    const commentaries = issue.commentaries.filter((com) => !com.isDescription)

    const {
        commentary,
        attachedFiles,
        errorCommentary,
        onCommentaryInput,
        setAttachedFiles,
        validateAndSubmit
    } = useAddCommentary({ onAdd: addCommentary })

    return (
        <Section className='eight'>
            <div className='h1'>Комментарии ({commentaries.length})</div>
            {commentaries.length > 0 &&
                <div className='commentaries'>
                    {commentaries.map((com) => {
                        return <IssueCommentary key={com.id} commentary={com} />
                    })}
                </div>}
            <div className='add-commentary'>
                <TextareaField
                    inputClassName='full-width'
                    textareaClassName='full-width'
                    label='Комментарий'
                    value={commentary}
                    onInput={onCommentaryInput}
                    error={errorCommentary}
                />
                <div className="row" style={{ gap: '1rem' }}>
                    <FileAttachmentField
                        files={attachedFiles}
                        setFiles={setAttachedFiles}
                    />
                    <Button
                        className='left'
                        type='submit'
                        onClick={validateAndSubmit}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </Section>
    )
}

export default IssueCommentaries