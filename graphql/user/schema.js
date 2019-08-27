exports.userSchema = `
  type User {
    id: ID!
    firstName: String!
  }
`;

exports.userQuerySchema = `
  User(UserId: ID!): User
`;

exports.userMutationSchema = `
  updateUser(UserId: ID!): User
`;
