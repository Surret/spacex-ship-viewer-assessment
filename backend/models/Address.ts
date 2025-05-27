import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import { User } from './User';

type OmitTypes = 'users';

class Address extends Model<
  InferAttributes<
    Address,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Address,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare address?: string | null;
  declare postcode?: string | null;
  declare users?: NonAttribute<User[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Address.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        address: { type: DataTypes.STRING, allowNull: true },
        postcode: { type: DataTypes.STRING, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return Address;
  }
  public static associate = ({ User }) => {
    Address.hasMany(User, { foreignKey: 'addressId', as: 'users' });
  };
}

export { Address, Address as AddressAttributes };
