# Fast and slow

## Introduction

When using data provided by others, you will most likely not find the right API to do so. You try to solve this by making a replication of all the data and thus create a replication hell. This not only makes it hard to maintain, but for evolving datasets also makes the data outdated quickly leading to a huge integration cost for the developer that uses multiple datasets.
The solution to this is making use of event streams. Querying these event streams directly will be fast only for simple questions such as asking for the last few events. In order to allow third parties to also have faster response times for any other query, we need to balance maintenance costs and query performance. This can be done by selecting the right fragmentation strategies for a specific event stream.
This project allows intermediaries to configure such fragmentation strategies. We created a UI on top of this to show how different fragmentations will turn into different querying performance. In order to understand the speed-up that was achieved, we provide a Web page to visualize query results and their performance.

This is the frontend of the [Fast and Slow](https://github.com/oSoc20/fast-and-slow) project for [_Informatie Vlaanderen_](https://overheid.vlaanderen.be/informatie-vlaanderen). In order to have a working application, you will need to setup the [backend](https://github.com/hdelva/tree_index) of the project. You can also then query your event streams with our [query interface](https://github.com/oSoc20/fast-and-slow-query).

### Requirements
* NodeJS
* npm
* VueJS
* A valid npm authentication token from _Informatie Vlaanderen_

### Back-end
```
# install project dependencies
npm install

# run the frontend
npm run serve
```