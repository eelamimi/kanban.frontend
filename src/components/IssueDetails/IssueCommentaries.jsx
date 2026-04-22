import { useContext } from 'react'
import { IssueContext } from '../../context/Issue/IssueContext'
import { useAddCommentary } from '../../hook/useAddCommentary'
import Section from '../Section'
import TextareaField from '../TextareaField'
import IssueCommentary from './IssueCommentary'
import Button from '../Button'

const IssueCommentaries = () => {
    const { issue, addCommentary } = useContext(IssueContext)
    const commentaries = issue.commentaries.filter((com) => !com.isDescription)

    const {
        commentary,
        errorCommentary,
        onCommentaryInput,
        validateAndSubmit
    } = useAddCommentary({ onAdd: addCommentary })

    return (
        <Section className='eight'>
            <div className='h1'>Комментарии ({commentaries.length})</div>
            {commentaries.length > 0 &&
                <div className='commentaries'>
                    {commentaries.map((com) => {
                        return <IssueCommentary commentary={com} />
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
                <Button
                    className='left'
                    type='submit'
                    onClick={validateAndSubmit}
                >
                    Добавить
                </Button>
            </div>
        </Section>
    )
}

export default IssueCommentaries