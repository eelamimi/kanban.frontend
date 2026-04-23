import { useEffect, useState, useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router'
import issueAPI from '../api/issueAPI'
import AuthService from '../service/AuthService'

export const useIssue = () => {
    const [searchParams] = useSearchParams()
    const projectIdFromUrl = searchParams.get('projectId')
    const { issuePublicId } = useParams()
    const [issue, setIssue] = useState(null)
    const [isLoadingIssue, setIsLoadingIssue] = useState(true)

    useEffect(() => {
        async function fetchIssue() {
            try {
                const response = await issueAPI.get({
                    issuePublicId,
                    projectId: projectIdFromUrl
                })
                setIssue(response)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setIsLoadingIssue(false)
            }
        }

        fetchIssue()
    }, [issuePublicId, projectIdFromUrl])

    const addCommentary = useCallback(async (formData) => {
        formData.append('IssueId', issue !== null ? issue.id : 'something')
        formData.append('AuthorId', AuthService.getUserInfo().userProfileId)

        const response = await issueAPI.addCommentary(formData)

        setIssue(response)
    }, [issue])

    return {
        issue,
        isLoadingIssue,
        addCommentary
    }
}