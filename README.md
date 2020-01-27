
# @Starter Neo4J Graph Javascript

#### To start developing clone repository

```bash
git clone https://github.com/rxdi/starter-neo4js-javascript
```

#### Open cloned repository and install packages
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
const { makeAugmentedSchema } = require("neo4j-graphql-js");

const typeDefs = `
type Movie {
  title: String
  year: Int
  imdbRating: Float
  genres: [Genre] @relation(name: "IN_GENRE", direction: "OUT")
}
type Genre {
  name: String
  movies: [Movie] @relation(name: "IN_GENRE", direction: "IN")
}
`;

setup({
  imports: [
    CoreModule.forRoot({ graphql: { initQuery: false } }),
    Neo4JModule.forRoot({
      schemaOverride: () => makeAugmentedSchema({ typeDefs }),
      password: "your-password",
      username: "neo4j",
      address: "bolt://localhost:7687"
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





#### Open voyager panel

```
http://0.0.0.0:9000/voyager
```


![voyager](https://ipfs.io/ipfs/QmWNEZANeePQLpY9P7AX4Kz6gwt7Z67NsxJhQy6GmXByo5)


#### Open graphiql DevTools
```
http://0.0.0.0:9000/devtools
```

#### Example

1. Create `Movie`

```graphql
mutation {
  CreateMovie(title: "Titanic", year: 1990, imdbRating: 1) {
    title
    year
    genres {
      name
    }
  }
}
```

2. Create `Genre`
```graphql
mutation {
  CreateGenre(name: "Drama") {
    name
    movies {
      title
      year
      imdbRating
    }
  }
}
```

3. Create `Relationship` between Genre `Drama` and Movie `Titanic`

```graphql
mutation {
  AddGenreMovies(from: { title: "Titanic" }, to: { name: "Drama" }) {
    from {
      title
    }
    to {
      name
    }
  }
}
```

4. List Genres

```graphql
query {
  Genre {
    name
    movies {
      title
    }
  }
}
```

5. List Movies

```graphql
query {
  Movie {
    title
    year
    genres {
      name
    }
  }
}
```

Notice that both objects are linked
