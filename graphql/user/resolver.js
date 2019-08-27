
/**
 * The `userQuery` or `userMutation` are objects of all queries or mutations resolver functions
 * related to user as this file `resolver` inside folder `user` will contain
 * all available resolvers needed
 */
exports.userQuery = {
  // UserList: async () => {
  //   const res = "await queryAllAsset('BUYER')"; // any normal functionality
  //   if (!res) {
  //     throw new Error('Error');
  //   }
  //   return res;
  // },

  // User: async (root, params) => {
  //   const res = 'await queryAsset(params.buyerId)'; // any normal functionality
  //   if (!res) {
  //     throw new Error('Error');
  //   }
  //   return res;
  // },
};

exports.userMutation = {
  updateUser: async (root, params) => {
    const res = 'await updateAsset(params.buyerId, params.newProperties)'; // any normal functionality
    if (!res) {
      throw new Error('Error');
    }
    return res;
  },
};
