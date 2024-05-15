# Build myList Feature #Nodejs #Typescript


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


## Overview:

The project aims to develop a feature-rich application that allows users to create and manage their personalized list of movies and TV shows. Users can add new content to their list, remove items as desired, and conveniently view their entire list. The application ensures a seamless user experience by implementing efficient caching mechanisms to meet strict performance requirements.

## Objective:

The primary objective of the project is to provide users with a user-friendly platform for organizing their favorite movies and TV shows. By enabling users to easily add, remove, and view items in their list, the application enhances user engagement and satisfaction. Furthermore, the project aims to optimize performance by leveraging caching mechanisms to ensure that the "List My Items" feature responds within 10 milliseconds, thereby delivering a responsive and efficient user experience.


## Functional Requirements:

  Add to My List: Users can add a movie or TV show to their list. Each item is identified by a unique ID, ensuring there are no duplicates in the user's list.

  Remove from My List: Users can remove an item from their list using the item's unique ID.

  List My Items: Users can retrieve all items in their list. The response is paginated to efficiently handle potentially large lists.

## Non-Functional Requirements:

  Performance: The "List My Items" feature is crucial and should respond in under 10 milliseconds to provide a seamless user experience.

## Implementation Details:

To meet the non-functional requirement of performance, caching mechanisms are employed. Initially, querying the database for the user's list would exceed the 10ms threshold. Hence, Redis caching is utilized.

  Caching Mechanism: Each time a user requests their list, the application checks Redis for a cached copy. If the data is present and within the cache's expiration period, it's fetched from Redis, ensuring a quick response time. However, if the data is not found in Redis or has expired, the application retrieves the updated list from the database.

  Updating Redis: When a user adds or removes content from their list, the corresponding Redis key for that user's list is deleted. This ensures that the next time the user requests their list, it's fetched directly from the updated database, reflecting the changes made.

By employing this caching strategy and actively managing Redis keys, the application ensures both data consistency and high performance, meeting the stringent non-functional requirement of responding within 10 milliseconds for the "List My Items" feature



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
