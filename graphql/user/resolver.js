/**
 * `userQuery` / `userMutation` hold the user-related query and mutation resolvers.
 * Placeholder examples — replace the bodies with real data-access logic.
 */
exports.userQuery = {
  // User: async (root, params) => { ... return queried user ... },
};

exports.userMutation = {
  updateUser: async () => {
    const res = 'replace with your updateUser resolver implementation';
    if (!res) {
      throw new Error('Error');
    }
    return res;
  },
};
