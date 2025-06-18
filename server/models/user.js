'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      User.belongsToMany(models.Band, {
        through: 'BandMembers',
        foreignKey: 'userId',
        as: 'bands'
      });
      User.hasMany(models.Rehearsal, {
        foreignKey: 'createdBy',
        as: 'createdRehearsals'
      });
      User.hasMany(models.Availability, {
        foreignKey: 'userId',
        as: 'availabilities'
      });
      User.hasMany(models.Attendance, {
        foreignKey: 'userId',
        as: 'attendances'
      });
    }

    // Instance method to compare passwords
    async validatePassword(password) {
      return bcrypt.compare(password, this.passwordHash);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profileImageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      notificationPreferences: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          email: true,
          push: true,
          sms: false
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      hooks: {
        beforeCreate: async (user) => {
          if (user.changed('passwordHash')) {
            user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('passwordHash')) {
            user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
          }
        }
      }
    }
  );
  return User;
};
