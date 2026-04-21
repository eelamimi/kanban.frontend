import { useContext } from 'react'
import { IssueContext } from '../../context/Issue/IssueContext'
import Section from '../Section'
import Button from '../Button'

const IssueHeader = () => {
    const { issue } = useContext(IssueContext)

    console.log(issue)

    return (
        <Section className='eight'>
            <div className='subsection'>
                <div className="h1">{issue.title}</div>
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
        </Section>
    )
}

export default IssueHeader