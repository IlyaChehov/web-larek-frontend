# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды\
1. Выполнить команду для установки зависимостей:
```
npm install
```
или
```
yarn
```
2. Запустить проект командой:
```
npm run start
```
или
```
yarn start
```
## Сборка проекта
```
npm run build
```
или
```
yarn build
```
## Интерфейсы описывающие основные данные в приложении
+ Интерфейс **IProduct** описывает данные карточки товаров:
```
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
};
```
+ Интерфейс **IResponseProducts** описывает ответ на GET запрос к API:
```
interface IResponseProducts {
  total: number;
  items: IProduct[];
};
```
+ Интерфейс **IResponseOrder** описывает ответ на POST запрос к API:
```
interface IResponseOrder {
  id: string;
  total: number;
};
```
+ Интерфейс **IOrderContacts** описывает контактные данные пользователя для формирования заказа
```
interface IOrderContacts {
  email: string;
  phone: string;
};
```
+ Интерфейс **IOrderData** описывает данные пользователя для формирования заказа
```
interface IOrderData {
  payment: string;
  address: string;
};
```
+ Интерфейс **IOrder** описывает все данные, которые необходимо отправить на сервер для оформления заказа, он раширяется интерфейсами **IOrderContacts** и **IOrderData**
```
interface IOrder extends IOrderContacts, IOrderData {
  total: number;
  items: string[];
};
```

