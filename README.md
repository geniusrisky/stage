# CRUD Rest API Nodejs with Typescript

Sample Nodejs API with Typescript and Mongodb

## Script:

- npm install
- npm start

## Nodejs Typescript project

Follow these steps to create a new nodejs project with Typescript

- npm init
- tsc --init
- configure tsconfig.json file:
  - "outDir": "./build", ( Redirect output structure to the directory. )
  - "rootDir": "./src", ( Specify the root directory of input files. Use to control the output directory structure with outDir.)

## Mongodb

Mongodb options you can use a local or a remote database:

- Local
- [Mongodb Atals](https://account.mongodb.com/account/login)

## Endponts:

### User:

- create user : localhost:8023/create-user
- user login : localhost:8023/user-login
- del user : localhost:8023/delete-user/:id
- update user : localhost:8023/update-user


### tvShows:

- create show : localhost:8023/create-show
- del show : localhost:8023/delete-show/:id
- update show: localhost:8023/update-show


### Movies:
- create movie : localhost:8023/create-movie
- del show : localhost:8023/delete-movie/:id/:id
- update show: localhost:8023/update-movie


### userActivity :
- add to list : localhost:8023/user/add-to-my-list
- fetch list: localhost:8023/user/fetch-list
- remove content from list: localhost:8023/user/remove-content-from-list