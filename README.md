# Fast and slow

## Introduction

Imagine that you want to do your groceries at a large supermarket. If all the items would be randomly distributed, it would take ages to complete your shopping list. This is why the supermarket helps their clients by placing similar groceries together on the shelves.
We are trying to do a very similar thing for large amounts of data. Thanks to linked data, we have the possibility to easily fragment data based on specific criteria. They allow us to find the similarities between the items to _fill our shelves_. With these properties, we can help balancing maintenance costs and query performance.
To make all of these fragmentations, we created an easy to use web tool that allow you to configure fragmentation strategies for multiple event streams.

## Installation

### Requirements
* NodeJS
* npm
* MongoDB
* VueJS

### Back-end
Enable the MongoDB service, then go to `admin-backend` and run
```
# install project dependencies
npm install

# run the backend
npm run start
```

### Front-end
Go to `admin-frontend` and run
```
# install project dependencies
npm install

# run the frontend
npm run serve
```