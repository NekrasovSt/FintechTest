# Запуск

```docker-compose up --remove-orphans -d --build```

Перейти в браузер по адресу http://localhost:8080

Необходим docker!

## Структура таблицы

```
create table public."CodeValues"
(

"Id"    uuid    not null constraint "PK_CodeValues" primary key,

"Order" integer not null,

"Code"  integer not null,

"Value" text    not null

);
```
Т.к. нет уверености что code должен быть уникальным, то я сделал id uuid.

## Api
Добавлено описание в формате OpenAPI
Доступно в дебаг режиме по адресу
``` http://localhost:5056/openapi```

# Клиент
Выполнен на основе React, material-ui, redux
Содержит страницы
- Добавление кодов
- Список кодов
- Странца меню

В клиенте добавлена клиентская пагинация т.к. используется стор, можно было конечно подгружать в стор страницами, но думаю тут это слишком.


# Задача 2

Скрипты для решения
```
select cl.ClientName, count(contacts.Id) from Clients as cl
left join ClientContacts as contacts on cl.Id = contacts.ClientId
group by cl.ClientName;
```
```
select cl.ClientName from Clients as cl
left join ClientContacts as contacts on cl.Id = contacts.ClientId
group by cl.ClientName
having count(contacts.Id) > 2;
```

# Задача 3

```
WITH cte (Id, Sd, Ed) AS (
SELECT
Id,
Dt AS Sd,
LEAD(Dt) OVER (PARTITION BY Id ORDER BY Dt) AS Ed
FROM Dates
ORDER BY Id, Sd)
select * from cte where Ed is not null;
```


