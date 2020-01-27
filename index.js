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