const { CoreModule, setup } = require('@gapi/core');
const { VoyagerModule } = require('@gapi/voyager');
const { Neo4JModule } = require('@rxdi/neo4j');
const { GraphQLObjectType, GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
  })
});

setup({
  imports: [
    CoreModule.forRoot(),
    Neo4JModule.forRoot({
      types: [UserType],
      password: 'your-password',
      username: 'neo4j',
      address: 'bolt://localhost:7687'
    }),
    VoyagerModule.forRoot()
  ]
}).subscribe();
