- _INSTRUCTIONS_
- run npm i from backend dir, after that, npm start

Hexagonal Layer Project:

- Controller layer: Control HTTP request/responses

- Service layer: Bussiness logic (hydrate frontend and compare algorithm, main task).

- Repository layer: communicate with DB for transactions (read/write).

- Models layer: Define objects structure and data:
  [ARTICLE] title, description, date, content, author, archiveDate:[{userID, archivedStatus}]. - Deleted when no user has archived it.
  [USER] email, password, archivedIdNews, deletedIdNews

- Routes layer: define routes and associate them to controllers
  [GET - new/:userId] TOKEN PROTECTED ROUTE response with pagination by 20 unarchived and not previously deleted news.
  [GET - archive:userId] TOKEN PROTECTED ROUTE response with pagination by 20 user archived news.
  [POST - new/:newId] TOKEN PROTECTED ROUTE create NEW and/or set archiveDate to NEW.
  [POST - archive/:newId] TOKEN PROTECTED ROUTE set IdNew to deletedUserNewsIds and delete the NEW if it's the only user who archived it.
  [POST - user/create] create new user with password and email.
  [POST - user/login] login user with credentials, if success, return JWT.
