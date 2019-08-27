const { userQuery, userMutation } = require('./user/resolver');
const { loginMutation } = require('./login/resolver');


/**
 * Here we register any new query resolver, or mutation resolver related
 * to make Modularity like (user Module) and we follow the convention as for `user` Module
 * we use eg. `userQuery` and for  user mutations resolver we use eg. `userMutation` and so on.
 */
const resolvers = {
  Query: {
    ...userQuery,
  },
  Mutation: {
    ...userMutation,
    ...loginMutation,
  },
};

module.exports = {
  resolvers,
};
