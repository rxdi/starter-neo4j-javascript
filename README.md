
# @Starter Neo4J Graph Javascript

#### To start developing clone repository

```bash
git clone https://github.com/rxdi/starter-neo4js-javascript
```

#### Install @gapi command line interface and typescript node
```bash
cd starter-neo4js-javascript && npm i
```

#### Download Neo4J database https://neo4j.com/download/

> Follow the steps and create your Graph using interface provided and set password to it

> default username for neo4j is `neo4j`

> You only need to setup `password` field

Open `index.js` and fill configuration

```javascript
const { CoreModule, setup } = require("@gapi/core");
const { VoyagerModule } = require("@gapi/voyager");
const { Neo4JModule } = require("@rxdi/neo4j");
const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: {
      type: GraphQLString
    }
  })
});

setup({
  imports: [
    CoreModule.forRoot(),
    Neo4JModule.forRoot({
      types: [UserType],
      password: "your-password",
      graphName: "neo4j",
      graphAddress: "bolt://localhost:7687"
    }),
    VoyagerModule.forRoot()
  ]
}).subscribe();

```

#### Start the application
> Wait for about 5 seconds and browser will be started leading you to Graphiql panel

```
node index.js
```





#### Use CRUD operations

```graphql
mutation mutations {
  CreateUser(id:"", name:"") {
    id
    name
    _id
  }
  DeleteUser(id:"") {
    id
    name
    _id
  }
  UpdateUser(id:"", name:"") {
    id
    name
  }
}

query queries {
  User(id:"", name:"", first: 10, offset: 20, orderBy:id_asc) {
    id
    name
  }
}
```


#### Open graphiql DevTools
```
http://0.0.0.0:9000/devtools
```

![dev-tools](https://ipfs.io/ipfs/QmPyMcVqLjyeVVUiYYWmE4PcXh2MvAnKzGhLjdrYVzC9ns)


#### Open voyager panel

```
http://0.0.0.0:9000/voyager
```


![voyager](https://ipfs.io/ipfs/QmWNEZANeePQLpY9P7AX4Kz6gwt7Z67NsxJhQy6GmXByo5)