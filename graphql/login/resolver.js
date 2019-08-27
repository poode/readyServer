
/**
 * The `loginMutation` is object of all queries or mutations resolver functions
 * related to login as this file `resolver` inside folder `login` will contain
 * all available resolvers needed
 */

exports.loginMutation = {
  login: async (root, params) => {
    const res = 'await updateAsset(params.buyerId, params.newProperties)'; // any normal functionality
    if (!res) {
      throw new Error('Error');
    }
    return res;
  },
};
