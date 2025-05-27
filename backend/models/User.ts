import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  NonAttribute,
  CreationOptional,
} from 'sequelize';

import { Address } from './Address';

type OmitTypes = 'address';

class User extends Model<
  InferAttributes<
    User,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    User,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare firstName?: string | null;
  declare contactNumber?: string;
  declare email?: string;
  declare profileImage?: string;
  declare addressId?: ForeignKey<User['id']>;
  declare address?: NonAttribute<Address>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        firstName: { type: DataTypes.STRING, allowNull: true },
        contactNumber: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        profileImage: { type: DataTypes.STRING, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return User;
  }
  public static associate = ({ Address }) => {
    User.belongsTo(Address, { foreignKey: 'addressId', as: 'address' });
  };
}

export { User, User as UserAttributes };
