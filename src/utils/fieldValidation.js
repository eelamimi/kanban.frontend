export function isBlank(value) {
    return value.length === 0 || (value.length > 0 && value.trim().length === 0)
}

export function validateRequired(value, message = 'Обязательное поле') {
    return isBlank(value) ? message : ''
}
