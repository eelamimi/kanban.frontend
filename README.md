# Kanban Board Frontend

Полнофункциональное веб-приложение Kanban-доски, построенное на React 19 с использованием современных технологий frontend-разработки.

## Содержание

- [Обзор проекта](#обзор-проекта)
- [Технологический стек](#технологический-стек)
- [Архитектура проекта](#архитектура-проекта)
- [Структура директорий](#структура-директорий)
- [Компоненты](#компоненты)
- [API-модули](#api-модули)
- [Контексты и состояние](#контексты-и-состояние)
- [Хуки](#хуки)
- [Маршрутизация](#маршрутизация)
- [Функциональность](#функциональность)
- [Запуск проекта](#запуск-проекта)

---

## Обзор проекта

Kanban Board Frontend — это клиентская часть системы управления проектами и задачами. Проект представляет собой интерактивную доску Канбан с поддержкой:

- **Drag & Drop** — перетаскивание задач между колонками
- **Фильтрация** — фильтрация задач по автору и исполнителю
- **Управление командами** — создание команд, проектов, назначение ролей
- **Управление задачами** — создание, редактирование, комментирование задач
- **Аутентификация** — регистрация, вход, валидация токенов
- **Приглашения** — система приглашений пользователей в команды

---

## Технологический стек

### Основные технологии

| Технология | Версия | Назначение |
|------------|--------|------------|
| React | 19.2.4 | UI-фреймворк |
| React Compiler | 1.0.0 | Оптимизация рендеринга |
| Vite | 8.0.1 | Сборщик и dev-сервер |
| Babel | 7.29.0 | Транспиляция JSX |

### UI-библиотеки

| Технология | Версия | Назначение |
|------------|--------|------------|
| @dnd-kit/core | 6.3.1 | Drag & Drop |
| @dnd-kit/sortable | 10.0.0 | Сортировка элементов |
| @dnd-kit/utilities | 3.2.2 | Утилиты для dnd-kit |
| @fortawesome/react-fontawesome | 3.3.0 | Иконки (Font Awesome) |

### Утилиты

| Технология | Версия | Назначение |
|------------|--------|------------|
| axios | 1.13.6 | HTTP-клиент |
| react-router | 7.13.1 | Маршрутизация |
| react-select | 5.10.2 | Выпадающие списки |
| react-textarea-autosize | 8.5.9 | Авторазмер textarea |
| file-saver | 2.0.5 | Сохранение файлов |

---

## Архитектура проекта

### Паттерн организации кода

Проект следует принципам **компонентного архитектурного паттерна** с разделением на:

- **Pages** — страницы, оборачивающие функциональность в провайдеры
- **Components** — визуальные компоненты, получающие данные из контекстов
- **Contexts** — управление состоянием на уровне фич
- **Hooks** — бизнес-логика и побочные эффекты
- **API** — взаимодействие с бэкендом
- **Utils** — вспомогательные функции

### Поток данных

```
Pages → Providers → Contexts ← Hooks → API → Backend
                ↓
         Components
```

1. **Pages** создают провайдеры и рендерят корневые компоненты
2. **Providers** создают контексты и предоставляют данные
3. **Components** получают данные из контекстов через `useContext`
4. **Hooks** содержат бизнес-логику и взаимодействуют с API
5. **API** отправляют запросы на бэкенд через настроенный axios

---

## Структура директорий

```
src/
├── api/                    # API-модули для взаимодействия с бэкендом
│   ├── attachmentAPI.js    # Работа с вложениями
│   ├── authAPI.js          # Аутентификация (register, login, verify)
│   ├── axiosConfig.js      # Конфигурация axios (interceptors)
│   ├── columnAPI.js       # Управление колонками
│   ├── commentaryAPI.js   # Комментарии к задачам
│   ├── inviteAPI.js       # Приглашения в команды
│   ├── issueAPI.js        # CRUD задач
│   ├── projectAPI.js      # Управление проектами
│   ├── rolesAPI.js        # Роли пользователей
│   ├── teamsAPI.js         # Управление командами
│   └── userAPI.js         # Информация о пользователях
│
├── assets/                 # Статические ресурсы
│   └── img/               # Изображения
│       ├── default_avatar.jpg
│       └── issueType/     # Иконки типов задач
│           ├── bug.png
│           ├── investigation.png
│           ├── task.png
│           └── story.png
│
├── components/            # UI-компоненты
│   ├── Board/            # Компоненты доски
│   │   ├── Columns.jsx   # Контейнер колонок
│   │   ├── Column.jsx   # Отдельная колонка
│   │   ├── Filter.jsx   # Фильтр участников
│   │   ├── Filters.jsx  # Панель фильтров
│   │   └── Issue.jsx    # Карточка задачи
│   │
│   ├── EditTeamModalSections/  # Секции модального окна редактирования команды
│   │   ├── EditRolesSection.jsx
│   │   ├── EditTeamSection.jsx
│   │   └── EditUserRolesSection.jsx
│   │
│   ├── IssueDetails/     # Детальный просмотр задачи
│   │   ├── IssueCommentaries.jsx
│   │   ├── IssueCommentary.jsx
│   │   ├── IssueDescriptionAndFiles.jsx
│   │   ├── IssueFile.jsx
│   │   └── IssueHeader.jsx
│   │
│   ├── Modals/           # Модальные окна
│   │   ├── AddIssueModal.jsx
│   │   ├── AddProjectModal.jsx
│   │   ├── AddTeamModal.jsx
│   │   ├── EditBoardModal.jsx
│   │   ├── EditIssueModal.jsx
│   │   ├── EditTeamModal.jsx
│   │   └── InviteUserModal.jsx
│   │
│   ├── UserProfile/      # Профиль пользователя
│   │   └── Card.jsx
│   │
│   ├── Button.jsx        # Кнопка
│   ├── Field.jsx        # Поле ввода
│   ├── FieldSet.jsx     # Группа полей
│   ├── FileAttachmentField.jsx  # Поле для файлов
│   ├── Form.jsx         # Форма
│   ├── Header.jsx       # Шапка
│   ├── InviteSection.jsx # Принятие приглашения
│   ├── Layout.jsx       # Корневой layout
│   ├── List.jsx         # Список элементов
│   ├── LoginForm.jsx    # Форма входа
│   ├── Modal.jsx        # Базовое модальное окно
│   ├── ModalSection.jsx # Секция модального окна
│   ├── RegistryForm.jsx # Форма регистрации
│   ├── Section.jsx      # Секция контента
│   ├── SelectField.jsx  # Выпадающий список
│   ├── Span.jsx         # Текстовый элемент
│   ├── Spinner.jsx      # Индикатор загрузки
│   ├── TeamDetails.jsx  # Детали команды
│   ├── TeamsNavItem.jsx # Навигация команд
│   ├── TeamsSection.jsx # Секция команд
│   ├── TextAreaField.jsx # Textarea
│   └── UserNavItem.jsx   # Навигация пользователя
│
├── consts/               # Константы
│   └── issueConsts.js   # Константы задач (типы, приоритеты, иконки)
│
├── context/              # React Context провайдеры
│   ├── Issue/          # Контекст задачи
│   │   ├── IssueContext.jsx
│   │   └── IssueProvider.jsx
│   ├── Login/          # Контекст входа
│   │   └── LoginProvider.jsx
│   ├── Project/        # Контекст проекта
│   │   ├── ProjectContext.jsx
│   │   └── ProjectProvider.jsx
│   ├── Registry/       # Контекст регистрации
│   │   └── RegistryProvider.jsx
│   ├── Team/           # Контекст команды
│   │   ├── TeamContext.jsx
│   │   └── TeamProvider.jsx
│   └── UserInfo/       # Контекст информации о пользователе
│       ├── UserInfoContext.jsx
│       └── UserInfoProvider.jsx
│
├── hook/                # Пользовательские хуки
│   ├── useAddColumn.js
│   ├── useAddCommentary.js
│   ├── useAddIssueModal.js
│   ├── useAuthCheck.js
│   ├── useEditCommentary.js
│   ├── useEditIssueModal.js
│   ├── useEditProjectModalSection.js
│   ├── useEditTeam.js
│   ├── useIssue.js
│   ├── useLogin.js
│   ├── usePageTitle.js
│   ├── useProject.js
│   ├── useRegister.js
│   ├── useRequireAuth.js
│   ├── useTeams.js
│   └── useUserInfo.js
│
├── pages/               # Страницы приложения
│   ├── routeConfig.js   # Конфигурация маршрутов (lazy loading)
│   ├── InvitePage.jsx
│   ├── IssuePage.jsx
│   ├── LoginPage.jsx
│   ├── ProfilePage.jsx
│   ├── ProjectPage.jsx
│   ├── RegistryPage.jsx
│   ├── TeamPage.jsx
│   └── TeamsPage.jsx
│
├── service/             # Сервисы
│   └── AuthService.js   # Управление аутентификацией
│
├── styles/              # Стили
│   ├── components/     # Стили компонентов
│   │   ├── button.css
│   │   ├── column.css
│   │   ├── columnRelations.css
│   │   ├── columns.css
│   │   ├── commentary.css
│   │   ├── error.css
│   │   ├── field.css
│   │   ├── fieldSet.css
│   │   ├── fileAttachment.css
│   │   ├── filters.css
│   │   ├── form.css
│   │   ├── header.css
│   │   ├── invite.css
│   │   ├── issue.css
│   │   ├── issueCommentaries.css
│   │   ├── issueDetails.css
│   │   ├── link.css
│   │   ├── list.css
│   │   ├── modal.css
│   │   ├── option.css
│   │   ├── section.css
│   │   ├── span.css
│   │   └── userProfile.css
│   ├── index.js        # Экспорт стилей
│   ├── main.css        # Глобальные стили
│   └── spinner.css     # Стили спиннера
│
├── utils/               # Утилиты
│   ├── dataFormatter.js  # Форматирование данных (даты)
│   ├── errorHandler.js   # Обработка ошибок (toast notifications)
│   └── fileFormatter.js  # Работа с файлами
│
├── App.jsx             # Корневой компонент
└── main.jsx            # Точка входа
```

---

## Компоненты

### Базовые компоненты

| Компонент | Описание |
|-----------|----------|
| `Button` | Кнопка с поддержкой состояний (disabled, loading) |
| `Field` | Поле ввода с валидацией и обработкой ошибок |
| `FieldSet` | Группа полей с заголовком |
| `Form` | Контейнер формы с поддержкой класса |
| `Modal` | Базовое модальное окно с header, content, footer |
| `Section` | Секция контента с поддержкой CSS-классов |
| `Span` | Текстовый элемент с label/value паттерном |
| `Spinner` | Индикатор загрузки |
| `SelectField` | Выпадающий список (react-select) |
| `TextAreaField` | Textarea с авторазмером |
| `List` | Список элементов с навигацией |
| `ErrorToast` | Toast-уведомление об ошибках |

### Компоненты аутентификации

| Компонент | Описание |
|-----------|----------|
| `LoginForm` | Форма входа (email, password) с валидацией |
| `RegistryForm` | Форма регистрации (имя, фамилия, email, пароль, подтверждение) |

### Компоненты навигации

| Компонент | Описание |
|-----------|----------|
| `Header` | Шапка с логотипом и навигацией |
| `Layout` | Основной layout с header и контентом |
| `TeamsNavItem` | Навигационный пункт команды |
| `UserNavItem` | Навигационный пункт пользователя |

### Компоненты доски

| Компонент | Описание |
|-----------|----------|
| `Board` | Главный компонент доски проекта |
| `Columns` | Контейнер всех колонок с DnD-контекстом |
| `Column` | Отдельная колонка (droppable zone) |
| `Issue` | Карточка задачи (draggable) |
| `Filters` | Панель фильтров (автор/исполнитель) |
| `Filter` | Отдельная кнопка фильтра |

### Компоненты задач

| Компонент | Описание |
|-----------|----------|
| `IssueDetails` | Детальный просмотр задачи |
| `IssueHeader` | Заголовок с типом, приоритетом, участниками |
| `IssueDescriptionAndFiles` | Описание и вложения |
| `IssueCommentaries` | Список комментариев |
| `IssueCommentary` | Один комментарий |
| `IssueFile` | Файл-вложение с возможностью скачивания |

### Компоненты управления

| Компонент | Описание |
|-----------|----------|
| `AddIssueModal` | Модальное окно создания задачи |
| `EditIssueModal` | Модальное окно редактирования задачи |
| `AddProjectModal` | Модальное окно создания проекта |
| `EditBoardModal` | Модальное окно редактирования доски |
| `AddTeamModal` | Модальное окно создания команды |
| `EditTeamModal` | Модальное окно редактирования команды |
| `InviteUserModal` | Модальное окно приглашения пользователя |

### Компоненты команд

| Компонент | Описание |
|-----------|----------|
| `TeamsSection` | Секция списка команд |
| `TeamDetails` | Детальная информация о команде |
| `UserProfile` | Профиль пользователя |
| `UserProfileCard` | Карточка профиля |
| `InviteSection` | Секция принятия приглашения |

---

## API-модули

### Конфигурация

`axiosConfig.js` настраивает базовый экземпляр axios с:
- Базовым URL из переменной окружения `VITE_BACKEND_API`
- Таймаутом 30 секунд
- Interceptor запросов — добавление токена и userProfileId в заголовки
- Interceptor ответов — обработка сетевых ошибок и 401 (редирект на логин)

### Методы API

| API-модуль | Методы |
|------------|--------|
| `authAPI` | `registerUser`, `loginUser`, `verifyToken` |
| `userAPI` | Работа с профилями пользователей |
| `teamsAPI` | Управление командами |
| `projectAPI` | CRUD проектов, получение с фильтрами |
| `issueAPI` | CRUD задач, перемещение между колонками, комментарии |
| `columnAPI` | Управление колонками |
| `commentaryAPI` | Комментарии к задачам |
| `attachmentAPI` | Загрузка и скачивание файлов |
| `rolesAPI` | Управление ролями |
| `inviteAPI` | Отправка приглашений |

---

## Контексты и состояние

### Архитектура Context

Каждый функциональный блок имеет пару Context/Provider:

```
Context (только данные и функции)
    ↓
Provider (создает контекст через хук)
    ↓
Page (оборачивает в провайдер)
    ↓
Component (потребляет через useContext)
```

### Контексты

| Контекст | Данные |
|----------|--------|
| `LoginContext` | email, password, setters |
| `RegistryContext` | firstName, secondName, email, password, confirmPassword |
| `UserInfoContext` | user, teams, isLoading, fetchUser, fetchTeams |
| `TeamContext` | team, isLoading, fetchTeam, updateTeam |
| `ProjectContext` | project, columns, members, filters, updateIssues |
| `IssueContext` | issue, comments, attachments, addCommentary, editIssue |

---

## Хуки

### Управление данными

| Хук | Назначение |
|-----|------------|
| `useProject` | Загрузка и обновление проекта с фильтрами |
| `useIssue` | Загрузка и управление задачей |
| `useTeams` | Загрузка списка команд |
| `useUserInfo` | Загрузка информации о пользователе |

### Управление модальными окнами

| Хук | Назначение |
|-----|------------|
| `useAddIssueModal` | Состояние и валидация формы создания задачи |
| `useEditIssueModal` | Состояние и валидация формы редактирования задачи |
| `useAddColumn` | Состояние формы добавления колонки |
| `useEditTeam` | Состояние редактирования команды |
| `useEditProjectModalSection` | Состояние секции редактирования проекта |

### Управление комментариями

| Хук | Назначение |
|-----|------------|
| `useAddCommentary` | Состояние и валидация нового комментария |
| `useEditCommentary` | Состояние и валидация редактирования комментария |

### Аутентификация

| Хук | Назначение |
|-----|------------|
| `useLogin` | Состояние формы входа |
| `useRegister` | Состояние формы регистрации |
| `useAuthCheck` | Проверка валидности токена |
| `useRequireAuth` | Защита маршрутов |

### Утилиты

| Хук | Назначение |
|-----|------------|
| `usePageTitle` | Динамическое изменение title страницы |

---

## Маршрутизация

### Конфигурация

Маршруты определены в `App.jsx` с использованием React Router v7.

### Маршруты

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/auth/registry` | RegistryPage | Страница регистрации |
| `/auth/login` | LoginPage | Страница входа |
| `/profile` | ProfilePage | Профиль текущего пользователя |
| `/profile?userId={id}` | ProfilePage | Профиль конкретного пользователя |
| `/teams` | TeamsPage | Список команд пользователя |
| `/teams/:teamId` | TeamPage | Детали команды |
| `/projects/:projectId` | ProjectPage | Доска проекта |
| `/issue/:issuePublicId` | IssuePage | Детали задачи |
| `/invite?token={token}` | InvitePage | Принятие приглашения |

### Lazy Loading

Все страницы загружаются через `lazy()` для оптимизацииbundle size:

```jsx
export const LoginPage = lazy(() => import('./LoginPage'))
```

---

## Функциональность

### Аутентификация

1. **Регистрация**: Имя, фамилия, email, пароль (мин. 6 символов), подтверждение пароля
2. **Вход**: Email + пароль с валидацией
3. **Валидация токена**: Периодическая проверка валидности токена (1 час)
4. **Хранение данных**: localStorage (token, userId, userProfileId)
5. **Автоматический редирект**: При истечении токена или 401 — редирект на логин

### Доска Kanban

1. **Drag & Drop**: Перетаскивание задач между колонками с ограничением по связям
2. **Фильтрация**: По автору и исполнителю через URL-параметры
3. **Отображение задач**: Карточки с типом, приоритетом, исполнителем, story points
4. **Создание задач**: Модальное окно с полями (тип, приоритет, описание, файлы)
5. **Редактирование проекта**: Модальное окно с настройками доски

### Управление задачами

1. **Детальный просмотр**: Тип, приоритет, автор, исполнитель, даты
2. **Описание**: Текстовое описание с историей изменений
3. **Вложения**: Загрузка файлов (до 20MB), скачивание
4. **Комментарии**: Добавление, редактирование, удаление
5. **Редактирование**: Изменение всех полей задачи

### Управление командами

1. **Создание команды**: Название, описание
2. **Редактирование**: Изменение названия, описания
3. **Управление ролями**: Создание, редактирование ролей
4. **Назначение ролей**: Привязка ролей к пользователям
5. **Приглашения**: Отправка приглашений по email, принятие по token

### Управление проектами

1. **Создание проекта**: Название, короткое имя, описание
2. **Управление участниками**: Автоматическое добавление из команды
3. **Настройка колонок**: Определение workflow

---

## Запуск проекта

### Установка зависимостей

```bash
npm install
```

### Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера с HMR |
| `npm run build` | Продакшен-сборка в `dist/` |
| `npm run preview` | Просмотр продакшен-сборки |
| `npm run lint` | Запуск ESLint |
| `npm run exposed preview` | Просмотр с внешним доступом |

### Переменные окружения

Создайте `.env` файл:

```env
VITE_BACKEND_API=http://localhost:5000/api
VITE_TOKEN_KEY=kanban_token
VITE_USER_ID=kanban_user_id
VITE_USER_PROFILE_ID=kanban_user_profile_id
```

---

## Особенности реализации

### React Compiler

Проект использует React Compiler для автоматической оптимизации:
- Мемоизация колбэков через `useCallback`
- Мемоизация значений через `useMemo`
- Автоматический batching побочных эффектов

### CSS-архитектура

- CSS-переменные для темы
- BEM-подобные классы
- Разделение на глобальные и компонентные стили

### Оптимизации

- Lazy loading страниц
- Мемоизация компонентов через `memo()`
- Виртуализация списков (при необходимости)
- Debounce для тяжелых операций

---

## Зависимости от бэкенда

Для корректной работы необходим бэкенд со следующими эндпоинтами:

- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — вход
- `POST /api/auth/verify` — валидация токена
- `GET /api/projects/:id` — получение проекта
- `POST /api/issues` — создание задачи
- `PUT /api/issues` — обновление задачи
- `POST /api/issues/moveIssue` — перемещение задачи
- `GET/POST /api/teams` — команды
- и другие...

---

*Документация создана для проекта Kanban Board Frontend*