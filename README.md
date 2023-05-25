[![Tests](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml/badge.svg)](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml)
<h1 align="center">react-mesto-api-full</h1>

---

<h2>Работа выполнена с использованием технологий:</h2>
<ul>
  <li><p>HTML</p></li>
  <li><p>CSS></p></li>
  <li><p>JavaScript></p></li>
  <li><p>Flexbox Layout</p></li>
  <li><p>Grid Layout</p></li>
  <li><p>Файловая структура организована по БЭМ nested</p></li>
  <li><p>Проект сделан по принципам объектно-ориентированного программирования</p></li>
</ul>
<h2>Функциональность фронтенда:</h2>
<ul>
  <li><p>Адаптировано под все типы устройств</p></li>
  <li><p>Добавлена возможность редактирования профиля</p></li>
  <li><p>Реализовано открытие/закрытие попапов по кнопке</p></li>
  <li><p>При наведении на элементы-ссылки, меняется прозрачность</li>
  <li><p>Реализована функция, для лайка понравившейся фотографии</li>
  <li><p>Добавлена возможность удаления карточки</li>
  <li><p>Исходные карточки создаются из массива</li>
  <li><p>Реализовано закрытие попапа через оверлэй и кнопку esc</li>
  <li><p>Добавлена валидация ко всем формам</li>
  <li><p>Используются классы</li>
  <li><p>Классы реализованы по принципам полиморфизма, наследования и инкапсуляции</li>
  <li><p>Проект реализован с помощью React</li>
  <li><p>Используются хуки, пропсы, эффекты</li>
  <li><p>Компоненты построены на функциональном подходе</li>
  <li><p>Работает передача контекста</li>
</ul>


## Функциональность бэкенда:
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

<h2>Над проектом работал:</h2>
<h3><a href="https://github.com/ilkor4" target="_blank">Корнелюк Илья</a></h3>


---


Адрес репозитория: https://github.com/ilkor4/react-mesto-api-full-gha.git

## Ссылки на проект

IP-адрес 158.160.1.58

Frontend https://ilkor.students.nomoredomains.monster

Backend https://api.ilkor.students.nomoredomains.monster
