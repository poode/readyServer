module.exports = {
  authRoute: {
    BaseRoute: '/api/v1/login',
    root: '/',
  },
  userRoute: {
    BaseRoute: '/api/v1/users',
    root: '/',
    userList: '/usersList',
    userByEmail: '/:username',
    registerUser: '/create',
  },

};
