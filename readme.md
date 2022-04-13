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
