export const API_ERRORS = {
    SERVER_NOT_RESPONDING: 'Сервер не отвечает',
    NOT_AUTHORIZED: 'Вы не авторизованы',

    TEAM: {
        LOAD: 'Ошибка загрузки команд',
        LOAD_SINGLE: 'Ошибка загрузки команды',
        ADD: 'Ошибка добавления команды',
        UPDATE: 'Ошибка изменения команды',
        DELETE_USER: 'Ошибка исключения пользователя',
    },

    PROJECT: {
        LOAD: 'Ошибка загрузки проекта',
        UPDATE: 'Ошибка обновление проекта',
        ADD: 'Ошибка добавления проекта',
    },

    ISSUE: {
        GET: 'Ошибка получения проблемы',
        ADD: 'Ошибка добавления проблемы',
        UPDATE: 'Ошибка изменения проблемы',
        MOVE: 'Ошибка перемещение проблемы',
        COMMENTARY_ADD: 'Ошибка добавления комментария',
    },

    COLUMN: {
        ADD: 'Ошибка добавления колонки',
        UPDATE_POSITION: 'Ошибка обновления позиции',
        UPDATE_RELATION: 'Ошибка обновления связи',
        UPDATE_NAME: 'Ошибка изменения имени колонки',
        DELETE: 'Ошибка удаление колонки',
    },

    ROLE: {
        ADD: 'Ошибка добавления роли',
        UPDATE: 'Ошибка изменения роли',
        DELETE: 'Ошибка удаления роли',
        UPDATE_USER: 'Ошибка изменения роли пользователя',
    },

    USER: {
        LOAD: 'Ошибка загрузки пользователя',
        UPDATE_AVATAR: 'Ошибка изменения аватара',
    },

    AUTH: {
        REGISTER: 'Ошибка регистрации',
        LOGIN: 'Ошибка авторизации',
        VERIFY_TOKEN: 'Токен недействителен',
    },

    ATTACHMENT: {
        GET: 'Ошибка получения приложения',
    },

    COMMENTARY: {
        UPDATE: 'Ошибка обновления комментария',
        DELETE: 'Ошибка удаления комментария',
    },

    COMMENTARY_UI: {
        EDIT: 'Ошибка изменения комментария',
        DELETE: 'Ошибка удаления комментария',
    },

    FILE: {
        GET: 'Ошибка получения файла',
    },
}

export const VALIDATION_MESSAGES = {
    REQUIRED: 'Обязательное поле',
    NAME_REQUIRED: 'Название обязательно',
    EMAIL_REQUIRED: 'Email обязателен для заполнения',
    INVALID_EMAIL: 'Введите корректный email адрес',
    PASSWORD_REQUIRED: 'Пароль обязателен для заполнения',
    PASSWORD_MIN_LENGTH: 'Пароль должен содержать минимум 6 символов',
    PASSWORDS_NOT_MATCH: 'Пароли не совпадают',
    FIRST_NAME_REQUIRED: 'Имя обязательно для заполнения',
    SECOND_NAME_REQUIRED: 'Фамилия обязательна для заполнения',
    COMMENTARY_REQUIRED: 'Комментарий обязателен',
    ASSIGNEE_REQUIRED: 'Исполнитель обязателен',
    AUTHOR_REQUIRED: 'Автор обязателен',
    ISSUE_TYPE_REQUIRED: 'Тип проблемы обязателен',
    ISSUE_PRIORITY_REQUIRED: 'Приоритет проблемы обязателен',
    TITLE_REQUIRED: 'Название обязательно',
    DESCRIPTION_REQUIRED: 'Описание обязательно',
    PROJECT_KEY_REQUIRED: 'Ключ проекта обязателен',
    FILE_TOO_LARGE: 'Файл слишком большой. Максимум 5MB',
    PLEASE_SELECT_FILE: 'Пожалуйста, выберите изображение',
    UPLOAD_FAILED: 'Не удалось загрузить фото',
    OVERSIZED_FILES: (names) => `Файлы превышают 20MB: ${names.join(', ')}`,
}
