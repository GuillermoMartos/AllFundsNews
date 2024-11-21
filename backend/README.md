- _INSTRUCTIONS_
- run npm i from backend dir, after that, npm start

Hexagonal Layer Project:

- Controller layer: Control HTTP request/responses

- Service layer: Bussiness logic (owns "rechargable" thriggers and filter new by archiveDate/userID value).

- Data Access layer: communicate with DB for transactions (read/write).

- Models layer: Define objects structure and data:
  [ARTICLE] title, description, date, content, author, archiveDate:{archiveDate, userID}. - TTL with expirationDate?
  [USER] email, password

- Routes layer: define routes and associate them to controllers
  [GET/new] response with pagination by 20 unarchived news
  [GET/archive] response with pagination by 20 archived news
  [PUT/new] set archiveDate to exiting NEW
  [DELETE/archive] delete NEW (or set TTL?)
