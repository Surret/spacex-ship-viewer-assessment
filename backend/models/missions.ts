import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { Ship } from './ship'; 

type OmitTypes = '';

class Mission extends Model<
  InferAttributes<Mission, { omit: OmitTypes }>,
  InferCreationAttributes<Mission, { omit: OmitTypes }>
> {
  declare id: CreationOptional<string>;
  declare missionName: string;
  declare missionObjective?: string | null;
  declare launchDate?: Date | null;
  declare landingDate?: Date | null;
  declare missionOutcome?: string | null;
  declare shipId: string; // Foreign key referencing Ship's id
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Mission.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        missionName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        missionObjective: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        launchDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        landingDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        missionOutcome: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        shipId: { // Foreign Key
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Ship,
            key: 'id',
          },
        },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
        tableName: 'missions', // Explicitly define the table name
      }
    );

    return Mission;
  }
}

export { Mission, Mission as MissionAttributes };