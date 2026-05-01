import lowestImg from '../assets/img/issuePriority/lowest.png'
import lowImg from '../assets/img/issuePriority/low.png'
import mediumImg from '../assets/img/issuePriority/medium.png'
import highImg from '../assets/img/issuePriority/high.png'
import highestImg from '../assets/img/issuePriority/highest.png'
import bugImg from '../assets/img/issueType/bug.png'
import taskImg from '../assets/img/issueType/task.png'
import storyImg from '../assets/img/issueType/story.png'
import investigationImg from '../assets/img/issueType/investigation.png'

export const issueTypesValue = {
    0: 'Bug',
    1: 'Story',
    2: 'Task',
    3: 'Investigation',
};

export const issuePrioritiesValue = {
    0: 'Minimal',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Critical',
}

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
    { value: 'Bug', label: 'Ошибка', img: bugImg, imgClassName: 'issue-type-priority-option' },
    { value: 'Story', label: 'История', img: storyImg, imgClassName: 'issue-type-priority-option' },
    { value: 'Task', label: 'Задача', img: taskImg, imgClassName: 'issue-type-priority-option' },
    { value: 'Investigation', label: 'Расследование', img: investigationImg, imgClassName: 'issue-type-priority-option' },
])

export const issuePriorityOptions = Object.freeze([
    { value: 'Critical', label: 'Критический', img: highestImg, imgClassName: 'issue-type-priority-option' },
    { value: 'High', label: 'Высокий', img: highImg, imgClassName: 'issue-type-priority-option' },
    { value: 'Medium', label: 'Средний', img: mediumImg, imgClassName: 'issue-type-priority-option' },
    { value: 'Low', label: 'Низкий', img: lowImg, imgClassName: 'issue-type-priority-option' },
    { value: 'Minimal', label: 'Минимальный', img: lowestImg, imgClassName: 'issue-type-priority-option' },
])