const { gql } = require('apollo-server-express');
const { userSchema, userQuerySchema, userMutationSchema } = require('./user/schema');
const { loginSchema, loginMutationSchema } = require('./login/schema');

/**
 * FullSchema to implement graphql with modularity concept
 * We tried to make from each Entity a `Schema`, a `QuerySchema`, and a `MutationSchema`
 * eg. `userSchema`, `userQuerySchema`, `userMutationSchema`
 */
const FullSchema = `
  ${userSchema}
  ${loginSchema}

  type Query {
    ${userQuerySchema}
  }

  type Mutation {
    ${userMutationSchema}
    ${loginMutationSchema}
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const typeDefs = gql`${FullSchema}`;

module.exports = { typeDefs };
