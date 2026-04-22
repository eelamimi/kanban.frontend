import { useContext } from 'react'
import { IssueContext } from '../../context/Issue/IssueContext'
import Section from '../Section'
import Button from '../Button'
import Span from '../Span'
import { issuePriorityImg, issueTypesImg } from '../../consts/issueConsts'
import { formatDate } from '../../utils/dataFormatter'

const IssueHeader = () => {
    const { issue } = useContext(IssueContext)

    return (
        <Section className='eight'>
            <div className='subsection'>
                <div className='h1'>{issue.title}</div>
                <Button
                    className='left'
                // TODO
                //
                // onClick={() => setIsEditBoardOpen(true)}
                >
                    Редактировать
                </Button>
                {/*
                TODO 
                edit issue modal

                <EditBoardModal
                    isOpen={isEditBoardOpen}
                    onClose={() => setIsEditBoardOpen(false)}
                /> */}
            </div>
            <div className='row' style={{ gap: '1rem' }}>
                <div className='column' style={{ gap: '0' }}>
                    <div className='row' style={{ gap: '1rem' }}>
                        <Span
                            label='Приоритет:'
                            imageClassName='issue-details_img-container'
                            src={issuePriorityImg[issue.issuePriority]}
                            h='18.4' w='18.4'
                        />
                        <Span
                            label='Тип:'
                            imageClassName='issue-details_img-container'
                            src={issueTypesImg[issue.issueType]}
                            h='18.4' w='18.4'
                        />
                    </div>
                    <Span
                        label='Оценка сложности:'
                        value={issue.storyPoints}
                    />
                </div>
                <div className='column' style={{ alignItems: 'center', gap: '0' }}>
                    <Span
                        label='Исполнитель:'
                        value={`${issue.assignee.firstName} ${issue.assignee.secondName}`}
                    />
                    <Span
                        label='Автор:'
                        value={`${issue.author.firstName} ${issue.author.secondName}`}
                    />
                </div>
                <div className='column' style={{ gap: '0' }}>
                    <Span
                        className='left'
                        label='Создана:'
                        value={formatDate(issue.createdAt)}
                    />
                    {issue.closedAt &&
                        <Span
                            className='left'
                            label='Удалена:'
                            value={formatDate(issue.closedAt)}
                        />}
                </div>
            </div>
        </Section>
    )
}

export default IssueHeader