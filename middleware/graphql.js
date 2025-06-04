const { ApolloServer } = require('apollo-server-express');

const { resolvers, typeDefs } = require('../graphql');

module.exports.graphqlMiddleware = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    /*
      Here enable graphql to be used online on live server
    */
    playground: false,
    introspection: false,
    context: ({ req }) => ({
      headers: req.headers,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });
};
