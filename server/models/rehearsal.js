'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rehearsal extends Model {
    static associate(models) {
      // Define associations here
      Rehearsal.belongsTo(models.Band, {
        foreignKey: 'bandId',
        as: 'band'
      });
      Rehearsal.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
      Rehearsal.hasMany(models.Attendance, {
        foreignKey: 'rehearsalId',
        as: 'attendances'
      });
      Rehearsal.hasMany(models.Setlist, {
        foreignKey: 'rehearsalId',
        as: 'setlists'
      });
    }
  }

  Rehearsal.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      bandId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Bands',
          key: 'id'
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      isRecurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      recurrencePattern: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Rehearsal',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  );
  return Rehearsal;
};
