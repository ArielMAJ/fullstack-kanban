import sequelize, { Optional } from "sequelize";
import db from "../database/configdb.js";

const { DataTypes, Model } = sequelize;

interface TodoAttributes {
  id: number;
  userId: number;
  content: string;
  done: boolean;
}

type TodoCreationAttributes = Optional<TodoAttributes, "id">;

class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  declare id: number;
  declare userId: number;
  declare content: string;
  declare done: boolean;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Todo",
    tableName: "todos",
    timestamps: true,
  }
);

export default Todo;
