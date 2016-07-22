var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      },
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return User;
};
