# Fast and slow
This is the frontend of the [Fast and Slow](https://github.com/oSoc20/fast-and-slow) project for [_Informatie Vlaanderen_](https://overheid.vlaanderen.be/informatie-vlaanderen).

## Introduction
When using data provided by others, you will most likely not find the right API to do so. You try to solve this by making a replication of all the data and thus create a replication hell. This not only makes it hard to maintain, but for evolving datasets also makes the data outdated quickly, leading to a huge integration cost for the developer that uses multiple datasets.

The solution to this is making use of event streams. Querying these event streams directly will be fast only for simple questions such as asking for the last few events. In order to allow third parties to also have faster response times for any other query, we need to balance maintenance costs and query performance. This can be done by selecting the right fragmentation strategies for a specific event stream.

This project allows intermediaries to configure such fragmentation strategies. We created a UI on top of this to show how different fragmentations will turn into different querying performance. In order to understand the speed-up that was achieved, we provide a Web page to visualize query results and their performance.


### Requirements
* npm
* VueJS
* A valid npm authentication token from _Informatie Vlaanderen_

### Running in a Docker container
Edit the [.env](https://github.com/oSoc20/fast-and-slow/blob/master/.env) file so that the backend url is configured.

```bash
docker build -t admin-interface --build-arg NPM_AUTH_TOKEN=<AUTH_CODE> .
```

```bash
docker run -d -p 8080:8080 -it --rm admin-interface
```

### Backend
#### Server
The backend is a nodeJS server that can be found [here](https://github.com/hdelva/tree_index). It is handles all communication to the database and is responsible for building and updating the fragmentations.

#### Database
The databse is a Scylla (cassandra) database. The setup is also discribed on the [backend page](https://github.com/hdelva/tree_index).

### Query interface
You have the possibility to query your event streams with our [query interface](https://github.com/oSoc20/fast-and-slow-query). This one is running on github pages and can be accessed [here](https://osoc20.github.io/fast-and-slow-query/)
