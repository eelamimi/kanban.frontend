import lowestImg from '../assets/img/issuePriority/lowest.png'
import lowImg from '../assets/img/issuePriority/low.png'
import mediumImg from '../assets/img/issuePriority/medium.png'
import highImg from '../assets/img/issuePriority/high.png'
import highestImg from '../assets/img/issuePriority/highest.png'
import bugImg from '../assets/img/issueType/bug.png'
import taskImg from '../assets/img/issueType/task.png'
import storyImg from '../assets/img/issueType/story.png'
import investigationImg from '../assets/img/issueType/investigation.png'

export const issueTypesImg = {
    0: bugImg,
    1: storyImg,
    2: taskImg,
    3: investigationImg,
}

export const issuePriorityImg = {
    0: lowestImg,
    1: lowImg,
    2: mediumImg,
    3: highImg,
    4: highestImg,
}

export const issueTypeOptions = Object.freeze([
    { value: 'Bug', label: 'Ошибка' },
    { value: 'Story', label: 'История' },
    { value: 'Task', label: 'Задача' },
    { value: 'Investigation', label: 'Расследование' }
])

export const issuePriorityOptions = Object.freeze([
    { value: 'Minimal', label: 'Минимальный' },
    { value: 'Low', label: 'Низкий' },
    { value: 'Medium', label: 'Средний' },
    { value: 'High', label: 'Высокий' },
    { value: 'Critical', label: 'Критический' }
])