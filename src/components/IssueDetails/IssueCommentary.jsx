import baseAvatar from '../../assets/img/default_avatar.jpg'
import AuthService from '../../service/AuthService'
import { formatDate } from '../../utils/dataFormatter'


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
                    <div className='commentary__edited'>
                        {`Изменено: ${formatDate(commentary.lastEditedAt)}`}
                    </div>}
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