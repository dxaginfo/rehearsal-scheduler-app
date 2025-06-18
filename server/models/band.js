'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    static associate(models) {
      // Define associations here
      Band.belongsToMany(models.User, {
        through: 'BandMembers',
        foreignKey: 'bandId',
        as: 'members'
      });
      Band.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
      Band.hasMany(models.Rehearsal, {
        foreignKey: 'bandId',
        as: 'rehearsals'
      });
    }
  }

  Band.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      logoUrl: {
        type: DataTypes.STRING,
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
      modelName: 'Band',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  );
  return Band;
};
