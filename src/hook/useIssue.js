import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import issueAPI from '../api/issueAPI'

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

    return {
        issue,
        isLoadingIssue
    }
}