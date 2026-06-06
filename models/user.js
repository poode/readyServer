/**
 * Sequelize User model (active when DB_TYPE=mysql).
 * Mirrors the Mongoose schema in api/v1/user/UserModel.js so the
 * user repository can switch between ORMs transparently.
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { len: [5, 255] },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  return User;
};
