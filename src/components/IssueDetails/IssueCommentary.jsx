import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import baseAvatar from '../../assets/img/default_avatar.jpg'
import AuthService from '../../service/AuthService'
import { formatDate } from '../../utils/dataFormatter'
import Button from '../Button'
import Span from '../Span'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect } from 'react'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import TextAreaField from '../TextAreaField'
import { useEditCommentary } from '../../hook/useEditCommentary'


const IssueCommentary = ({ commentary }) => {
    const { author } = commentary
    const fullName = `${author.firstName} ${author.secondName}`
    const isAuthor = author.id === AuthService.getUserInfo().userProfileId

    const editInnerHandler = useCallback(async () => {

    }, [])

    const {
        content,
        error,
        setContent,
        onContentInput,
        isEditingCommentary,
        isEditing,
        isDeleting,
        handleEditCommentary,
        handleDeleteCommentary
    } = useEditCommentary({ editInnerHandler })

    useEffect(() => {
        setContent(commentary.content)
    }, [commentary.content, setContent])

    return (
        <div className='commentary__container'>
            <div className='commentary__header'>
                <img
                    className='commentary__avatar'
                    src={author.avatar || baseAvatar}
                    alt={fullName}
                    title={`Фото профиля ${fullName}`}
                    width='20px'
                    height='20px'
                    loading='lazy'
                />
                <div className='commentary__fullName'>
                    {fullName}
                </div>
                {commentary.isEdited &&
                    <Span
                        className='commentary__edited'
                        label='Изменено:'
                        value={formatDate(commentary.lastEditedAt)}
                    />}
            </div>
            <div className='commentary__content'>
                {isEditingCommentary
                    ? <TextAreaField
                        id={`editCommentaryContent${commentary.id}`}
                        fieldClassName='full-width no-margin-bottom'
                        textareaClassName='full-width no-margin-bottom'
                        value={content}
                        onInput={onContentInput}
                        error={error}
                    />
                    : commentary.content}
            </div>
            {isAuthor &&
                <div className='commentary_buttons'>
                    <Button
                        className='commentary__editButton'
                        onClick={handleEditCommentary}
                        isDisabled={isEditing}
                    >
                        {isEditingCommentary
                            ? <FontAwesomeIcon icon={faCheck} />
                            : <FontAwesomeIcon icon={faPenToSquare} />}
                    </Button>
                    <Button
                        className='commentary__deleteButton close'
                        onClick={handleDeleteCommentary}
                        isDisabled={isDeleting}
                    >
                        <FontAwesomeIcon icon={faX} />
                    </Button>
                </div>}
        </div>
    )
}

export default IssueCommentary