[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## Основная функциональность:
<ul>
  <li>GET /users — возвращает всех пользователей из базы</li>
<li>GET /users/:userId — возвращает пользователя по _id</li>
<li>POST /users — создаёт пользователя с переданными в теле запроса name , about и avatar</li>
<li>PATCH /users/me — обновляет профиль пользователя</li>
<li>PATCH /users/me/avatar — обновляет аватар пользователя</li>
<li>GET /cards — возвращает все карточки из базы</li>
<li>POST /cards — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для
карточки</li>
<li>DELETE /cards/:cardId — удаляет карточку по _id</li>
<li>PUT /cards/:cardId/likes — ставит лайк карточке</li>
<li>DELETE /cards/:cardId/likes — убирает лайк с карточки</li>
</ul>


## Директории

`/routes` — папка с файлами роутера
`/controllers` — папка с файлами контроллеров пользователя и карточки
`/models` — папка с файлами описания схем пользователя и карточки


## Запуск проекта

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload

<h2>Над проектом работал:</h2>
<h3><a href="https://github.com/ilkor4" target="_blank">Il.kor</a></h3>

________________________________

<a href="https://github.com/ilkor4/express-mesto-gha.git" target="_blank">Сcылка на репозиторий</a>
