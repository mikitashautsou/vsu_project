# Функциональные требования

|    Объект    |         Действие         |             Пользователь             |       Сотрудник ГАИ        |    Бухгалтер    | Менеджер | Администратор |
| :----------: | :----------------------: | :----------------------------------: | :------------------------: | :-------------: | :------: | :-----------: |
| Пользователь |    Зарегистироваться     |                  ✅                  |             ❌             |       ❌        |    ❌    |      ❌       |
| Пользователь |           CRUD           |                  ❌                  |             ❌             |       ❌        |    ✅    |      ✅       |
|   Аккаунт    |    Зарегистироваться     |                  ✅                  |             ❌             |       ❌        |    ❌    |      ✅       |
|   Аккаунт    |          Войти           |                  ✅                  |             ✅             |       ✅        |    ✅    |      ✅       |
|   Аккаунт    |      Обновить поля       |      ✅(только своего аккаунта)      | ✅(только своего аккаунта) |       ✅        |    ✅    |      ✅       |
|   Аккаунт    |         Просмотр         |      ✅(только своего аккаунта)      | ✅(только своего аккаунта) |       ✅        |    ✅    |      ✅       |
|   Аккаунт    |         Удалить          |                  ❌                  |             ❌             |       ✅        |    ✅    |
|   Аккаунт    |         Создать          |                  ❌                  |             ❌             |       ✅        |    ✅    |      ✅       |
|  Транзации   |   Перечислить средства   |    ✅(только со своего аккаунта)     |             ✅             |       ✅        |    ✅    |      ✅       |
|  Транзации   |         Просмотр         | ✅(только транзации своего аккаунта) |             ✅             |       ✅        |    ✅    |      ✅       |
|  Транзации   | Пополнить счет(наличные) |                  ❌                  |             ✅             |       ✅        |    ✅    |      ✅       |
| Пользователь |           CRUD           |                  ❌                  |             ❌             |       ✅        |    ✅    |      ✅       |
|  Автомобиль  |           CRUD           |                  ❌                  |             ✅             |       ❌        |    ✅    |      ✅       |
|  Автомобиль  |        продавать         |           ✅(только свой)            |             ✅             |       ❌        |    ✅    |      ✅       |
|  Автомобиль  |          купить          |                  ✅                  |             ✅             |       ❌        |    ✅    |      ✅       |
| Доверенность |           CRUD           |           ✅(только свою)            |      ✅(только свою)       | ✅(только свою) |    ✅    |      ✅       |
| Доверенность |           CRUD           |           ✅(только свою)            |      ✅(только свою)       | ✅(только свою) |    ✅    |      ✅       |
|   Лицензия   |           CRUD           |                  ❌                  |             ✅             |       ✅        |    ✅    |      ✅       |

## User requirements

![user requirements](https://github.com/mikitashautsou/vsu_project/blob/main/docs/1-user-requirements.png?raw=true)

## Deployment diagram

![deployment diagram](https://github.com/mikitashautsou/vsu_project/blob/main/docs/2-deployment-diagram.png?raw=true)

## Entities diagram

![Entities diagram](https://github.com/mikitashautsou/vsu_project/blob/main/docs/3-entities.png?raw=true)

## Frontend diagram

![Frontend diagram](https://github.com/mikitashautsou/vsu_project/blob/main/docs/4-frontend-architecture.png?raw=true)

## Backend diagram

![Backend diagram](https://github.com/mikitashautsou/vsu_project/blob/main/docs/5-backend-architecture.png?raw=true)

## ER diagram

![ER diagram](https://github.com/mikitashautsou/vsu_project/blob/main/docs/6-er-diagram.png)
