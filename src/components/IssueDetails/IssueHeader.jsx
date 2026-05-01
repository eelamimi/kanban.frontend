import { memo, useContext, useState } from 'react'
import { IssueContext } from '../../context/Issue/IssueContext'
import Section from '../Section'
import Button from '../Button'
import Span from '../Span'
import { issuePriorityImg, issueTypesImg } from '../../consts/issueConsts'
import { formatDate } from '../../utils/dataFormatter'
import EditIssueModal from '../Modals/EditIssueModal'
import ProjectProvider from '../../context/Project/ProjectContext'

const IssueHeader = () => {
    const { issue } = useContext(IssueContext)
    const [isEditIssue, setIsEditIssue] = useState(false)

    return (
        <Section className='eight'>
            <div className='subsection'>
                <div className='h1'>{issue.title}</div>
                <Button
                    className='left'
                    onClick={() => setIsEditIssue(true)}
                >
                    Редактировать
                </Button>
                <ProjectProvider>
                    <EditIssueModal
                        isOpen={isEditIssue}
                        onClose={() => setIsEditIssue(false)}
                    />
                </ProjectProvider>
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
                            label='Закрыта:'
                            value={formatDate(issue.closedAt)}
                        />}
                </div>
            </div>
        </Section>
    )
}

export default memo(IssueHeader)