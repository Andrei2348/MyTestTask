## О репозитории
### Проект: Форма обратной связи
## Описание
Этот проект представляет собой форму обратной связи, которая включает в себя следующие поля:
Имя (текстовое поле)
E-mail (поле типа email)
Телефон (текстовое поле)
Сообщение (textarea)
Форма включает валидацию и отправку данных на сервер через AJAX. Также предусмотрено модальное окно, которое открывается при нажатии на кнопку.
Запуск проекта
## 1. Запуск сервера
В корне проекта выполните команду:
node server/index.js

## 2. Запуск сборки
Для сборки проекта выполните команду:
npm run build

## 3. Запуск проекта
Запустите сервер:
npm run server
Требования
Весь JavaScript код должен быть написан модульно с синтаксисом ES6 без использования сторонних библиотек, таких как jQuery.
Для стилей обязательно использовать препроцессор (любой, но желательно SASS).
Все исходники компилировать при помощи Webpack.
Исходный код должен быть залит в публичный репозиторий.

### Задачи
## 1. Развернуть проект
Создать структуру папок.
Создать файл .gitignore с корректным содержимым.
Подключить git.
Подключить Webpack.

## 2. Сверстать форму обратной связи
С полями:
Имя (текстовое поле)
E-mail (поле типа email)
Телефон (текстовое поле)
Сообщение (textarea)

## 3. Подключить маску для телефона
Использовать маску для телефона из npm.

## 4. Написать модуль валидации формы на JS
Выводить текст ошибки (произвольный) под соответствующим полем.
Поля с ошибкой стилизовать соответственно (например, красный бордер).
Правила валидации:
Все поля обязательны к заполнению.
Поле email должно содержать корректный адрес электронной почты.

## 5. Написать модуль AJAX отправки формы.

## 6. Обработать ответ error
Вывод соответствующих сообщений об ошибке.

## 7. Обработать ответ success
Очистить все поля.
Вывести сообщение msg.

## 8. Сверстать произвольное модальное окно
Добавить на страницу кнопку, которая будет открывать это модальное окно.
Требования:
При открытии модального окна страница не должна “дергаться”.
Открытие должно быть анимированным (на ваше усмотрение).
Страница не должна прокручиваться при открытом модальном окне.
