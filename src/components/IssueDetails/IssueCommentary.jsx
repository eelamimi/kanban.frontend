import baseAvatar from '../../assets/img/default_avatar.jpg'
import AuthService from '../../service/AuthService'
import { formatDate } from '../../utils/dataFormatter'
import Span from '../Span'


const IssueCommentary = ({ commentary }) => {
    const { author } = commentary
    const fullName = `${author.firstName} ${author.secondName}`
    const isAuthor = author.id === AuthService.getUserInfo().userProfileId

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
                {commentary.content}
            </div>
            {isAuthor &&
                <button className='commentary__editButton'>
                    Редактировать
                </button>}
        </div>
    )
}

export default IssueCommentary